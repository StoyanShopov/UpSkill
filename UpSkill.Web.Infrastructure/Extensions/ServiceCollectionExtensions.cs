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
    using UpSkill.Services.Account;
    using UpSkill.Services.Blob;
    using UpSkill.Services.Contracts.Account;
    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Services.Contracts.Email;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Services.Data.Admin;
    using UpSkill.Services.Data.Coach;
    using UpSkill.Services.Data.Company;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Services.Data.Contracts.File;
    using UpSkill.Services.Data.Course;
    using UpSkill.Services.Data.Employee;
    using UpSkill.Services.Data.File;
    using UpSkill.Services.Email;
    using UpSkill.Services.Identity;
    using UpSkill.Services.Messaging;
    using UpSkill.Web.Filters;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.Infrastructure.Web.Extensions;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.EmailSenderConstants;
    using static Common.GlobalConstants.PoliciesNamesConstants;
    using static Common.GlobalConstants.RolesNamesConstants;
    using static Common.GlobalConstants.SwaggerConstants;

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

        public static IServiceCollection AddBlobStorage(this IServiceCollection services, IConfiguration configuration)
        {
            IConfigurationSection blobStorage
                = configuration.GetSection(nameof(Services.BlobStorage));

            services.Configure<BlobStorage>(blobStorage);

            return services;
        }

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

        public static IServiceCollection AddAuthorizations(this IServiceCollection services)
        {
            services
                .AddAuthorization(options =>
                {
                    options.AddPolicy(
                        AdministratorOnly,
                        policy => policy.RequireRole(AdministratorRoleName));

                    options.AddPolicy(
                        OwnerOnly,
                        policy => policy.RequireRole(CompanyOwnerRoleName));

                    options.AddPolicy(
                        EmployeeOnly,
                        policy => policy.RequireRole(CompanyEmployeeRoleName));
                });

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
                        ValidateAudience = false,
                    };
                });

            return services;
        }

        public static IServiceCollection AddBussinesServices(this IServiceCollection services)
            => services
                .AddTransient<IIdentityService, IdentityService>()
                .AddTransient<IEmailService, EmailService>()
                .AddTransient<IAccountService, AccountService>()
                .AddTransient<IAdminService, AdminService>()
                .AddTransient<ICoursesService, CoursesService>()
                .AddTransient<ICompanyService, CompaniesService>()
                .AddTransient<ICoachServices, CoachesService>()
                .AddTransient<IEmployeeService, EmployeesService>()
                .AddTransient<IFileService, FileService>()
                .AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>))
                .AddScoped(typeof(IRepository<>), typeof(EfRepository<>))
                .AddScoped<IDbQueryRunner, DbQueryRunner>()
                .AddTransient<IBlobService, BlobService>()
                .AddTransient<IEmployeesService, EmployeesService>();

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
                       Version = V1,
                   });
           });

        public static IServiceCollection AddSwagenAuthorization(this IServiceCollection services)
            => services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition(Bearer, new OpenApiSecurityScheme()
                {
                    Name = Authorization,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = Bearer,
                    BearerFormat = JWT,
                    In = ParameterLocation.Header,
                    Description = AuthorizationDescription,
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = Bearer,
                            },
                        },
                        System.Array.Empty<string>()
                    },
                });
            });

        public static void AddApiControllers(this IServiceCollection services)
            => services
                .AddControllers(options => options
                    .Filters
                    .Add<ModelOrNotFoundActionFilter>());
    }
}
