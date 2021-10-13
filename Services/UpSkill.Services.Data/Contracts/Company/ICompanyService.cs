namespace UpSkill.Services.Data.Contracts.Company 
{
    using System.Collections.Generic;
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Company;

    public interface ICompanyService
    {
        Task<Result> CreateAsync(CreateCompanyRequestModel model);

        Task<Result> EditAsync(UpdateCompanyRequestModel model);

        Task<Result> DeleteAsync(int id);

        Task<TModel> GetByIdAsync<TModel>(int id);  

        Task<IEnumerable<TModel>> GetAllAsync<TModel>();
    }
}
