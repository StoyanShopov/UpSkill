namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    public interface IOwnerServices
    {
        Task<IEnumerable<TModel>> GetAllAsync<TModel>();

        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<IEnumerable<TModel>> GetAllCoachesAsync<TModel>(string userId);

        Task<Result> AddCoachAsync(AddCoachToCompanyModel model);

        Task<Result> RemoveCoachAsync(int coachId, string userId);

        Task<CoursesCountModel> CountCompanyCourses<TModel>(string userId);
    }
}
