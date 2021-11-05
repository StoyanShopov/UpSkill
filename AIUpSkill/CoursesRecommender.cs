namespace AIUpSkill
{
    using System.IO;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.ML;
    using Microsoft.Extensions.Logging;

    using Newtonsoft.Json;

    using AIUpSkill.Models;

    using static AIConstants.Constants;

    public class CoursesRecommender
    {
        private readonly PredictionEnginePool<UsersInCourses, UserCourseScorePrediction> predictionEnginePool;

        public CoursesRecommender(PredictionEnginePool<UsersInCourses, UserCourseScorePrediction> predictionEnginePool)
            => this.predictionEnginePool = predictionEnginePool;

        [FunctionName(CoursesRecommenderFunction)]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, Post, Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation(CoursesRecommenderFunctionProcessed);

            string requestBody = new StreamReader(req.Body).ReadToEnd();

            log.LogInformation(requestBody);

            var coursesData = JsonConvert.DeserializeObject<UsersInCourses>(requestBody);

            var prediction = this.predictionEnginePool.Predict(coursesData);

            return new OkObjectResult(prediction);
        }
    }
}
