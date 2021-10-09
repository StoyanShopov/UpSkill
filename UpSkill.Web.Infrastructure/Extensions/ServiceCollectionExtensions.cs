namespace UpSkill.Web.Web.Extensions
{
    using System.Text;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    using UpSkill.Data;
    using UpSkill.Data.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Data.Repositories;
    using UpSkill.Services;
    using UpSkill.Services.Contracts.Email;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Services.Email;
    using UpSkill.Services.Identity;
    using UpSkill.Services.Messaging;
    using UpSkill.Web.Filters;
    using UpSkill.Web.Infrastructure.Web.Extensions;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Services.Contracts.Account;
    using UpSkill.Services.Account;
    using UpSkill.Services.Data.Contracts;
    using UpSkill.Services.Data.Admin;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.SwaggerConstants;
    using static Common.GlobalConstants.EmailSenderConstants;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddEmailSender(
            this IServiceCollection services,
            IConfiguration configuration)
                => services
                    .AddTransient<IEmailSender>(x => new SendGridEmailSender(configuration
                    .GetSection(SendGridApiKey).Value));

        public static AppSettings GetApplicationSettings(
         this IServiceCollection services,
         IConfiguration configuration)
        {
            var applicationSettingsConfiguration = configuration.GetSection(ApplicationSettings);
            services.Configure<AppSettings>(applicationSettingsConfiguration);
            return applicationSettingsConfiguration.Get<AppSettings>();
        }

        public static IServiceCollection AddDatabase(
            this IServiceCollection services,
            IConfiguration configuration)
            => services
                .AddDbContext<ApplicationDbContext>(options => options
                    .UseSqlServer(configuration.GetDefaultConnectionString()));

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services
                .AddIdentity<ApplicationUser, ApplicationRole>(options =>
                {
                    options.SignIn.RequireConfirmedEmail = true;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 6;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(
          this IServiceCollection services,
          AppSettings appSettings)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            return services;
        }

        public static IServiceCollection AddBussinesServices(this IServiceCollection services) 
            => services 
                .AddTransient<IIdentityService, IdentityService>()
                .AddTransient<IEmailService, EmailService>() 
                .AddTransient<IAccountService, AccountService>()  
                .AddTransient<IAdminUsersService, AdminUsersService>()
                .AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>))
                .AddScoped(typeof(IRepository<>), typeof(EfRepository<>))
                .AddScoped<IDbQueryRunner, DbQueryRunner>();

        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
            => services
                .AddTransient<ICurrentUserService, CurrentUserService>();

        public static IServiceCollection AddSwagger(this IServiceCollection services)
           => services.AddSwaggerGen(c =>
           {
               c.SwaggerDoc(
                   V1,
                   new OpenApiInfo
                   {
                       Title = UpSkillAPI,
                       Version = V1
                   });
           });

        public static void AddApiControllers(this IServiceCollection services)
            => services
                .AddControllers(options => options
                    .Filters
                    .Add<ModelOrNotFoundActionFilter>());
    }
}
