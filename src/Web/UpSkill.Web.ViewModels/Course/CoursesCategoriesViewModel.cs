namespace UpSkill.Web.ViewModels.Course
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CoursesCategoriesViewModel : IMapFrom<Course>
    {
        public string CategoryName { get; set; }
    }
}
