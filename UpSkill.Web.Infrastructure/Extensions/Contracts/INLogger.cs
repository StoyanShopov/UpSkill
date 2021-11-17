namespace UpSkill.Web.Infrastructure.Extensions.Contracts
{
    using System;

    public interface INLogger
    {
        void Debug(object obj);

        void Info(object obj);

        void Error(object obj, Exception ex);

        void Fatal(object obj, Exception ex);
    }
}
