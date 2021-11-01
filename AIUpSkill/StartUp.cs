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
               uri: "https://titanscob.blob.core.windows.net/azure-webjobs-secrets/users-in-courses.csv");
        }
    }
}
