namespace UpSkill.Web.Infrastructure.Web.Extensions
{
    using Microsoft.Extensions.Configuration;

    using static Common.GlobalConstants;

    public static class ConfigurationExtensions
    {
        public static string GetDefaultConnectionString(this IConfiguration configuration)
            => configuration.GetConnectionString(DefaultConnection);

        public static string GetSignalRConnectionString(this IConfiguration configuration)
            => configuration.GetSection(SignalR).GetSection("ConnectionString").Value;
    }
}
