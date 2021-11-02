namespace UpSkill.Web
{
    using System.IO;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using NLog.Web;

    public static class Program
    {
        public static void Main(string[] args)
        {
            var logPath = Path.Combine(Directory.GetCurrentDirectory(), "NLog");
            NLog.GlobalDiagnosticsContext.Set("LogDirectory", logPath);

            CreateHostBuilder(args)
            .Build()
            .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.UseStartup<Startup>();
                    })
            .ConfigureLogging(opt =>
            {
                opt.ClearProviders();
                opt.SetMinimumLevel(LogLevel.Trace);
            })
            .UseNLog();
    }
}
