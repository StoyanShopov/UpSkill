namespace AIUpSkill
{
    using System.IO;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.ML;

    using Newtonsoft.Json;

    using AIUpSkill.Models;

    public class CoursesRecommender
    {
        private readonly PredictionEnginePool<UsersInCourses, UserCourseScorePrediction> predictionEnginePool;

        public CoursesRecommender(PredictionEnginePool<UsersInCourses, UserCourseScorePrediction> predictionEnginePool)
            => this.predictionEnginePool = predictionEnginePool;

        [FunctionName("CoursesRecommender")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = new StreamReader(req.Body).ReadToEnd();

            log.LogInformation(requestBody);

            var coursesData = JsonConvert.DeserializeObject<UsersInCourses>(requestBody);

            var prediction = this.predictionEnginePool.Predict("UpSkillUsersInCourses", coursesData);

            return new OkObjectResult(prediction);
        }
    }
}
