﻿namespace UpSkill.Web.ViewModels.Employee
{
    using Microsoft.AspNetCore.Http;

    public class UpdateEmployeeRequestModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfileSummary { get; set; }

        public IFormFile File { get; set; }
    }
}
