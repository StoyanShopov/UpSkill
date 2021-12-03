namespace UpSkill.Web
{
    using System.Reflection;
    using JavaScriptEngineSwitcher.V8;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using UpSkill.Data;
    using UpSkill.Data.Seeding;
    using UpSkill.Services.Hubs;
    using UpSkill.Services.Mapping;

    using UpSkill.Web.Infrastructure.Web.Extensions;
    using UpSkill.Web.ViewModels;
    using UpSkill.Web.Web.Extensions;

    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration) => this.configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services
                 .AddDatabase(this.configuration)
                 .AddBlobStorage(this.configuration)
                 .AddIdentity()
                 .AddAuthorizations()
                 .AddJwtAuthentication(services.GetApplicationSettings(this.configuration))
                 .AddBussinesServices()
                 .AddInfrastructureServices()
                 .AddSwagger()
                 .AddSwagenAuthorization()
                 .AddApiControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services
                 .AddHttpContextAccessor();

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddSingleton(this.configuration);

            // services
            //    .AddSignalR()
            //    .AddAzureSignalR(this.configuration.GetSignalRConnectionString());
            services.AddEmailSender(this.configuration);

            services.AddApplicationInsightsTelemetry();


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                new ApplicationDbContextSeeder().SeedAsync(dbContext, serviceScope.ServiceProvider).GetAwaiter().GetResult();
            }

            JavaScriptEngineSwitcher.Core
                                    .JsEngineSwitcher
                                    .Current
                                    .DefaultEngineName = V8JsEngine.EngineName;

            JavaScriptEngineSwitcher.Core.JsEngineSwitcher.Current.EngineFactories.AddV8();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }

            app
                .UseStaticFiles()
                .UseSpaStaticFiles();

            app
                .UseSwaggerUI()
                .UseRouting()
                .UseFileServer()
                .UseCors(options => options
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
                .UseHttpsRedirection()
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                    endpoints.MapControllerRoute("areaRoute", "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapRazorPages();
                })
                .ApplyMigrations();

            // app.UseAzureSignalR(route =>
            // {
            //     route.MapHub<ChatHub>("/chat");
            //     route.MapHub<ZoomHub>("/zoom");
            // });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
