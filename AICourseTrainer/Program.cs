using Microsoft.ML;
using Microsoft.ML.Trainers;
using System;
using System.Collections.Generic;
using System.Text;

namespace AICourseTrainer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            var modelFile = "C:\\Users\\Ivo\\Development\\Titans\\AIUpSkill\\AICourseTrainer\\UpSkillCoursesModel.zip";
            var dataTrain = "C:\\Users\\Ivo\\Development\\Titans\\AIUpSkill\\AICourseTrainer\\users-in-courses.csv";

            TrainModel(dataTrain, modelFile);

            var testModelData = new List<UsersInCourses>
                             {
                                 // UserId = 100 => HTML & CSS (11), JS Essentials(12), JS Advanced (18)
                                 new UsersInCourses { UserId = 100, CourseId = 19 }, // JS Apps
                                 new UsersInCourses { UserId = 100, CourseId = 13 }, // PHP Web
                                 new UsersInCourses { UserId = 100, CourseId = 24 }, // Android Basics
                             };

            TestModel(modelFile, testModelData);
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

