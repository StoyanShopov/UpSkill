namespace UpSkill.Services.Data.Contracts
{
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Administration.Courses;

    public interface ICoursesService
    {
        Task<string> CreateCourse(CourseInputModel model);

        Task<CourseViewModel> GetCourseById(string id);

        Task<string> EditCourse(CourseInputModel model, string id);

        Task<string> DeleteCourse(string id);
    }
}
