namespace UpSkill.Web.ViewModels.Employee
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class DetailsViewModel : IMapFrom<ApplicationUser>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
