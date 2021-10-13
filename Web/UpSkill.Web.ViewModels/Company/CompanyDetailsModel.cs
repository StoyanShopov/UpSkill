namespace UpSkill.Web.ViewModels.Company
{
    using AutoMapper;

    using UpSkill.Services.Mapping;
    using UpSkill.Data.Models;

    public class CompanyDetailsModel : IMapFrom<Company>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public int UsersCount { get; set; }

        public int CoursesCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Company, CompanyDetailsModel>()
                .ForMember(c => c.UsersCount,
                c => c.MapFrom(c => c.Users.Count));

            configuration.CreateMap<Company, CompanyDetailsModel>()
                .ForMember(c => c.CoursesCount,
                c => c.MapFrom(c => c.Courses.Count)); 
        }
    }
}
