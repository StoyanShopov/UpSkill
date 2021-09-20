namespace TheProjectOfTitans.Infrastructure.Extensions
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.OpenApi.Models;

    using TheProjectOfTitans.Infrastructure.Filters;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
          => services.AddSwaggerGen(c =>
          {
              c.SwaggerDoc(
                  "v1",
                  new OpenApiInfo
                  {
                      Title = "UpSkill API",
                      Version = "v1"
                  });
          });

        public static void AddCookiePolicyOptions(IServiceCollection services)
            => services.Configure<CookiePolicyOptions>(
                options =>
                {
                    options.CheckConsentNeeded = context => true;
                    options.MinimumSameSitePolicy = SameSiteMode.None;
                });

        public static void AddApiControllers(this IServiceCollection services)
            => services
                .AddControllers(options => options
                    .Filters
                    .Add<ModelOrNotFoundActionFilter>());
    }
}
