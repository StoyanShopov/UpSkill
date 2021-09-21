namespace TheProjectOfTitans.Infrastructure.Extensions
{
    using Microsoft.AspNetCore.Builder;

    public static class AplicationBulderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
            => app
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "UpSkill API");
                });
    }
}
