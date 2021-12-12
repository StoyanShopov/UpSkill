namespace UpSkill.Web.ViewModels.Employee
{
    using System;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class EmployeeProfileEditViewModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string CompanyName { get; set; }

        public string FilePath { get; set; } = string.Empty;

        public string ProfileSummary { get; set; }
    }
}
