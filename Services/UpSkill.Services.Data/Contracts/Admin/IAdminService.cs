namespace UpSkill.Services.Data.Contracts.Admin
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Administration.Company;

    public interface IAdminService
    {
        Task<Result> AddCompanyOwnerToCompanyAsync(AddCompanyOwnerRequestModel model, int id);

        Task<string> Promote(ApplicationUser user);

        Task<string> Demote(ApplicationUser user);
    }
}
