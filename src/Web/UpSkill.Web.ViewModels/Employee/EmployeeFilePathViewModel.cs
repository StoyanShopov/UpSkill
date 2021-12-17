namespace UpSkill.Web.ViewModels.Employee
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class EmployeeFilePathViewModel : IMapFrom<UserProfile>
    {
        public string FileFilePath { get; set; }

        public string ProfileSummary { get; set; }
    }
}
