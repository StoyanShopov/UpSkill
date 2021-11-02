namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Course;

    public interface IOwnerServices
    {
        Task<IEnumerable<TModel>> GetAllAsync<TModel>();

        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<CoursesCountModel> CountCompanyCourses<TModel>(string userId);
    }
}
