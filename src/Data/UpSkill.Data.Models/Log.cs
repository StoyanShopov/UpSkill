﻿namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;

    public class Log : BaseModel<int>
    {
        public string Level { get; set; }

        public string MachineName { get; set; }

        public string Username { get; set; }

        public string Controller { get; set; }

        public string Action { get; set; }

        public string RequestMethod { get; set; }

        public string RequestPostData { get; set; }

        public string RequestQueryString { get; set; }

        public string RequestURL { get; set; }

        public string Exception { get; set; }

        public string UserAuthType { get; set; }

        public string UserClaim { get; set; }

        public bool IsAuthenticated { get; set; }

        public string ClientIP { get; set; }

        public string ISSName { get; set; }
    }
}
