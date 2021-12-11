namespace UpSkill.Web.ViewModels.Employee
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class ListEmployeesViewModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
