namespace UpSkill.Services.Data.Contracts
{
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Administration.Courses;

    public interface IRepository
    {
        Task<string> CreateCourse(CourseFormModel model);

        Task<CourseViewModel> GetCourseById(string id);

        Task<string> EditCourse(CourseFormModel model, string id);

        Task<string> DeleteCourse(string id);
    }
}
