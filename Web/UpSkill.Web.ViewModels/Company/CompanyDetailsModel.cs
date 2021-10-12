namespace UpSkill.Web.ViewModels.Company
{
    using UpSkill.Services.Mapping;
    using UpSkill.Data.Models; 

    public class CompanyDetailsModel : IMapFrom<Company>
    {
        public int TotalUsersCount { get; set; }

        public int TotalCoursesCount { get; set; } 
    }
}
