namespace UpSkill.Services.Data.Contracts.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Common;
    using Web.ViewModels.Course;

    public interface ICoursesService
    {
        Task<Result> CreateAsync(CreateCourseViewModel model);

        Task<Result> EditAsync(EditCourseViewModel model);

        Task<Result> DeleteAsync(int id);

        Task<IEnumerable<TModel>> GetCourseByIdAsync<TModel>(int id);
    }
}
