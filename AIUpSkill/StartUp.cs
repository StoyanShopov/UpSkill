using System;

using Microsoft.Extensions.ML;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.WindowsAzure.Storage;

using AIUpSkill;
using AIUpSkill.Models;

using static AIUpSkill.AIConstants.Constants;

[assembly: FunctionsStartup(typeof(StartUp))]
namespace AIUpSkill
{
    public class StartUp : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable(AzureWebJobsStorage, 
                EnvironmentVariableTarget.Process);

            var storageAccount = CloudStorageAccount.Parse(connectionString);

            var client = storageAccount.CreateCloudBlobClient();

            var container = client.GetContainerReference(AzureWebjobsSecrets);

            var model = container.GetBlockBlobReference(UpSkillCoursesModel);

            var uri = model.Uri.AbsoluteUri;

            builder.Services.AddPredictionEnginePool<UsersInCourses, UserCourseScorePrediction>()
                .FromUri(uri, 
                period: TimeSpan.FromMinutes(1));
        }
    }
}
