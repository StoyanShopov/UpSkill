namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Course;

    public interface IOwnerCoursesService
    {
        Task RequestCourseAsync(RequestCourseViewModel model);

        Task<Result> DisableCourseAsync(int courseId, string userId);

        Task<IEnumerable<TModel>> GetActiveCoursesAsync<TModel>(string id);
    }
}
