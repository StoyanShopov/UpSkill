namespace UpSkill.Services.Data.Contracts.Course
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Course;

    public interface ICoursesService
    {
        Task<Result> CreateAsync(CreateCourseViewModel model);

        Task<Result> EditAsync(EditCourseViewModel model, int id);

        Task<Result> DeleteAsync(int id);

        Task<TModel> GetByIdAsync<TModel>(int id);
    }
}
