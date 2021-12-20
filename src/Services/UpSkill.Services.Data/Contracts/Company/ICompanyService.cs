namespace UpSkill.Services.Data.Contracts.Company
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Common.Models;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Company;

    public interface ICompanyService
    {
        Task<Result> CreateAsync(CreateCompanyRequestModel model);

        Task<Result> EditAsync(UpdateCompanyRequestModel model, int id);

        Task<Result> DeleteAsync(int id);

        Task<TModel> GetByIdAsync<TModel>(int id);

        Task<TModel> DetailsAsync<TModel>(int id);

        Task<IEnumerable<TModel>> GetAllAsync<TModel>();

        Task<BaseDeletableModel<int>> GetDbModelByIdAsync(int id);

        Task<IList<ApplicationUser>> GetCompanyEmailAsync();
    }
}
