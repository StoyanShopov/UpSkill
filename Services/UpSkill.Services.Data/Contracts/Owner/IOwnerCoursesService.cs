namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    public interface IOwnerCoursesService
    {
        Task RequestCourseAsync(RequestCourseViewModel model);

        Task<Result> EnableCourseAsync(GetCourseByIdViewModel viewModel, string id);

        Task<Result> DisableCourseAsync(GetCourseByIdViewModel viewModel, string id);

        Task<IEnumerable<TModel>> GetActiveCoursesAsync<TModel>(string id);
    }
}
