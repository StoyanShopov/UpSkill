namespace UpSkill.Web.Infrastructure.Web.Extensions
{
    using UpSkill.Data;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using static Common.GlobalConstants.SwaggerConstants; 

    public static class AplicationBulderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
          => app
              .UseSwagger()
              .UseSwaggerUI(options =>
              {
                  options.SwaggerEndpoint(SwaggerHttpPath, UpSkillAPI); 
              });

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<ApplicationDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
