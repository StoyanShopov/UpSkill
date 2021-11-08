namespace UpSkill.Data.Models
{
    using System;

    public class Log
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Level { get; set; }

        public string Message { get; set; }

        public string MachineName { get; set; }

        public string Logger { get; set; }


    }
}
