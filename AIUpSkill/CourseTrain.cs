namespace AIUpSkill
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;

    using Microsoft.ML;
    using Microsoft.ML.Trainers;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Extensions.Logging;

    using AIUpSkill.Models;

    public class CourseTrain
    {
        [FunctionName("CourseTrain")]
        public void Run([BlobTrigger("input/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob, string name, ILogger log)
        {
            log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");

            Console.OutputEncoding = Encoding.UTF8;
            var data = Path.Combine("Data", "users-in-courses.csv");
            var modelFile = "UpSkillCourses.zip";

            TrainModel(data, modelFile);
        }

        private static void TrainModel(string inputFile, string modelFile)
        {
            var context = new MLContext();

            IDataView trainingDataView = context.Data.LoadFromTextFile<UsersInCourses>(
                inputFile,
                hasHeader: true,
                separatorChar: ',');

            IEstimator<ITransformer> estimator = context.Transforms.Conversion
                .MapValueToKey(outputColumnName: "userIdEncoded", inputColumnName: nameof(UsersInCourses.UserId)).Append(
                    context.Transforms.Conversion.MapValueToKey(outputColumnName: "courseIdEncoded", inputColumnName: nameof(UsersInCourses.CourseId)));

            var options = new MatrixFactorizationTrainer.Options
            {
                LossFunction = MatrixFactorizationTrainer.LossFunctionType.SquareLossOneClass,
                MatrixColumnIndexColumnName = "userIdEncoded",
                MatrixRowIndexColumnName = "courseIdEncoded",
                Alpha = 0.1,
                Lambda = 0.5,
                NumberOfIterations = 50,
            };

            var trainerEstimator = estimator.Append(context.Recommendation().Trainers.MatrixFactorization(options));
            ITransformer model = trainerEstimator.Fit(trainingDataView);

            context.Model.Save(model, trainingDataView.Schema, modelFile);
        }
    }
}
