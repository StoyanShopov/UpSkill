using System;
using System.IO;

using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using AIUpSKillCourseTrainer;
using System.Data.SqlClient;

[assembly: FunctionsStartup(typeof(StartUp))]
namespace AIUpSKillCourseTrainer
{
    public class StartUp : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings");

            using SqlConnection connection = new SqlConnection(connectionString);

            try
            {
                connection.Open();

                var text = "select * from UserInCourses";

                using SqlCommand cmd = new SqlCommand(text, connection);

                var rows = cmd.ExecuteNonQuery();
            }

            finally
            {
                connection.Close();
            }
        }
    }
}
