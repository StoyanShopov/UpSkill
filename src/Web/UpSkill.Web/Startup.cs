namespace UpSkill.Web
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Reflection;
    using AspNetCoreHero.ToastNotification;
    using AspNetCoreHero.ToastNotification.Extensions;
    using JavaScriptEngineSwitcher.V8;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Localization;
    using Microsoft.AspNetCore.Mvc.Razor;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Options;
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
            services.AddRazorPages();

            services.AddControllersWithViews();

            services.AddLocalization(options => { options.ResourcesPath = "Resources"; });

            services.AddMvc()
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                .AddDataAnnotationsLocalization();

            services.Configure<RequestLocalizationOptions>(opt =>
            {
                var supportedCultures = new List<CultureInfo>
                {
                    new CultureInfo("en"),
                    new CultureInfo("bg"),
                };
                opt.DefaultRequestCulture = new RequestCulture("en");
                opt.SupportedCultures = supportedCultures;
                opt.SupportedUICultures = supportedCultures;
            });

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

            services.AddRazorPages()
               .AddRazorPagesOptions(options => options.Conventions
               .AddPageRoute("/Home", string.Empty));

            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddSingleton(this.configuration);

            // services
            //    .AddSignalR()
            //    .AddAzureSignalR(this.configuration.GetSignalRConnectionString());

            services.AddEmailSender(this.configuration);
            services.AddHttpContextAccessor();

            services.AddNotyf(config => {
                config.DurationInSeconds = 7;
                config.IsDismissable = true;
                config.Position = NotyfPosition.TopCenter;
            });

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

            app
             .UseRequestLocalization(
                app.ApplicationServices
             .GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }

            app
                .UseStaticFiles()
                .UseSpaStaticFiles();

            app.UseNotyf();

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
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
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
