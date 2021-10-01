namespace UpSkill.Services.Contracts.Account
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Account;

    public interface IAccountService
    {
        Task<Result> ChangePasswordAsync(ChangePasswordRequestModel model);
    }
}
