namespace UpSkill.Services.Data.Contracts.Course
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Course;
    public interface ICoursesService
    {
        Task<Result> CreateAsync(CreateCourseViewModel model);

        Task<Result> EditAsync(EditCourseViewModel model);

        Task<Result> DeleteAsync(int id);

        Task<Result> AddCompanyAsync(AddCompanyToCourseViewModel model);

        Task<TModel> GetByIdAsync<TModel>(int id);

    }
}
