namespace UpSkill.Web.Infrastructure.Extensions
{
    using System;
    using System.Text.Json;

    using NLog;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;

    public sealed class NLogExtensions : INLogger
    {
        private static Logger logger;

        public void Debug(object obj)
        {
            var serialized = this.SerializeObject(obj);

            this.GetLogger("*").Debug(serialized);
        }

        public void Info(object obj)
        {
            var serialized = this.SerializeObject(obj);

            this.GetLogger("*").Info(serialized);
        }

        public void Error(object obj, Exception exception)
        {
            var serialized = this.SerializeObject(obj);

            this.GetLogger("*").Error(serialized, exception);
        }

        public void Fatal(object obj, Exception ex)
        {
            var serialized = this.SerializeObject(obj);

            this.GetLogger("*").Fatal(serialized, ex);
        }

        private Logger GetLogger(string theLogger)
        {
            if (logger == null)
            {
                logger = LogManager.GetLogger(theLogger);
            }

            return logger;
        }

        private string SerializeObject(object obj)
        {
            return JsonSerializer.Serialize(obj);
        }
    }
}
