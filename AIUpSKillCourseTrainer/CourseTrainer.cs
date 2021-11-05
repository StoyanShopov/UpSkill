namespace AIUpSKillCourseTrainer
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Extensions.Logging;

    using AIUpSKillCourseTrainer.DataModel;
    using Microsoft.ML;
    using AIUpSKillCourseTrainer.Models;
    using Microsoft.ML.Trainers;

    using static Connection;

    public static class CourseTrainer
    {
        [FunctionName("CourseTrainer")]
        public static IActionResult Run([TimerTrigger("*/10 * * * * *")]TimerInfo myTimer, ILogger log)
        {
            var connectionString = ConnectionString;

            List<UserInCourses> dbModel = new List<UserInCourses>();

            using SqlConnection connection = new SqlConnection(connectionString);

            try
            {
                connection.Open();

                var text = "SELECT * FROM UserInCourses";

                using SqlCommand cmd = new SqlCommand(text, connection);

                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    UserInCourses model = new UserInCourses()
                    {
                        UserId = reader["UserId"].ToString(),
                        CourseId = (int)reader["CourseId"],
                    };

                    dbModel.Add(model);
                }
            }

            catch (Exception exception)
            {
                log.LogError(exception.ToString());
            }

            if (dbModel.Count > 0)
            {
                return new OkObjectResult(dbModel);
            }

            return new NotFoundResult();
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
                LabelColumnName = nameof(UsersInCourses.Label),
                Alpha = 0.1,
                Lambda = 0.5,
                NumberOfIterations = 1000,
            };

            var trainerEstimator = estimator.Append(context.Recommendation().Trainers.MatrixFactorization(options));
            ITransformer model = trainerEstimator.Fit(trainingDataView);

            context.Model.Save(model, trainingDataView.Schema, modelFile);
        }

        private static void TestModel(string modelFile, IEnumerable<UsersInCourses> testModelData)
        {
            var context = new MLContext();
            var model = context.Model.Load(modelFile, out _);
            var predictionEngine = context.Model.CreatePredictionEngine<UsersInCourses, UsersInCoursesScorePrediction>(model);
            foreach (var testInput in testModelData)
            {
                var prediction = predictionEngine.Predict(testInput);
                Console.WriteLine($"User: {testInput.UserId}, Course: {testInput.CourseId}, Score: {prediction.Score}");
            }
        }
    }
}
