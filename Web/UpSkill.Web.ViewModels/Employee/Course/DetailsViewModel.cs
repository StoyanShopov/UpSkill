namespace UpSkill.Web.ViewModels.Employee.Course
{
    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class DetailsViewModel : IMapFrom<Course>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string CourseTitle { get; set; }

        public string CourseDescription { get; set; }

        public decimal CoursePrice { get; set; }

        public int CourseCategoryId { get; set; }

        public string CourseCoachFirstName { get; set; }

        public string CourseCoachLastName { get; set; }

        public string CourseFileFilePath { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CompanyCourse, DetailsViewModel>()
               .ForMember(
               c => c.Id,
               c => c.MapFrom(c => c.CourseId));
        }
    }
}
