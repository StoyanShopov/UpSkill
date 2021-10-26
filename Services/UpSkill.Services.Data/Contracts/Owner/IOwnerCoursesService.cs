namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    public interface IOwnerCoursesService
    {
        Task RequestCourseAsync(RequestCourseViewModel model);

        Task EnableCourse(GetOwnerAndCourseByIdViewModel viewModel);

        Task DisableCourse(GetOwnerAndCourseByIdViewModel viewModel);

        Task<IEnumerable<TModel>> GetAll<TModel>();
    }
}
