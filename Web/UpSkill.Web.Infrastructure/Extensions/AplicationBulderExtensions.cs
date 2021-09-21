namespace UpSkill.Web.Extensions
{
    using Microsoft.AspNetCore.Builder;

    public static class AplicationBulderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
          => app
              .UseSwagger()
              .UseSwaggerUI(options =>
              {
                  options.SwaggerEndpoint("/swagger/v1/swagger.json", "My Twitter API");
              });
    }
}
