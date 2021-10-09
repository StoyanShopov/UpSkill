namespace UpSkill.Services.Data.Contracts
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Administration.Company;

    public interface IAdminUsersService 
    {
        Task<Result> CreateAsync(InputRequestModel model);

        Task<Result> EditAsync(UpdateRequestModel model); 

        Task<Result> DeleteAsync(int id);

        Task<Result> AddCompanyOwenerToCompanyAsync(AddCompanyOwnerRequestModel model, int id); 
    }
}
