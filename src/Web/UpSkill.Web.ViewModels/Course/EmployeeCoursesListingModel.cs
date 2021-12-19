namespace UpSkill.Web.ViewModels.Course
{
    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class EmployeeCoursesListingModel : IMapFrom<Course>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string CourseTitle { get; set; }

        public int CourseCategoryId { get; set; }

        public decimal CoursePrice { get; set; }

        public string CourseCoachFirstName { get; set; }

        public string CourseCoachLastName { get; set; }

        public string CourseFileFilePath { get; set; }

        public string CourseDescription { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<UserInCourse, EmployeeCoursesListingModel>()
                .ForMember(
                c => c.Id,
                c => c.MapFrom(c => c.CourseId));
        }
    }
}
