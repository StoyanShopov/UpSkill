using System;

using Microsoft.Extensions.ML;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;

using AIUpSkill;
using AIUpSkill.Models;

[assembly: FunctionsStartup(typeof(StartUp))]
namespace AIUpSkill
{
    public class StartUp : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddPredictionEnginePool<UsersInCourses, UserCourseScorePrediction>()
              .FromUri(
               modelName: "UpSkillUsersInCourses",
              uri: "https://titanscob.blob.core.windows.net/azure-webjobs-secrets/UpSkillCourses.zip",
              period: TimeSpan.FromMinutes(1));
        }
    }
}
