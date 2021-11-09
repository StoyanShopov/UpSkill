namespace UpSkill.Data.Models
{
    using System;

    public class Log
    {
        public int Id { get; set; }

        public string Level { get; set; }

        public DateTime CreatedOn { get; set; }

        public string MachineName { get; set; }

        public string Message { get; set; }

        public string Controller { get; set; }

        public string Action { get; set; }

        public string RequestMethod { get; set; }

        public string RequestQueryString { get; set; }

        public string RequestURL { get; set; }

        public string UserAuthType { get; set; }

        public string UserClaim { get; set; }

        public bool IsAuthenticated { get; set; }

        public string ClientIP { get; set; }

        public string ISSName { get; set; }
    }
}
