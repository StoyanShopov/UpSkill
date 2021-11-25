namespace UpSkill.Web.ViewModels.Employee
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class EmployeeProfileEditViewModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CompanyName { get; set; }
    }
}
