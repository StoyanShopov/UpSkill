namespace UpSkill.Services.Data.Contracts.Coach
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Coach;

    public interface ICoachServices
    {
        Task<Result> CreateAsync(CreateCoachRequestModel model);

        Task<Result> EditAsync(UpdateCoachRequestMode model, int id);

        Task<Result> DeleteAsync(int id);

        Task<TModel> GetByIdAsync<TModel>(int id);
    }
}
