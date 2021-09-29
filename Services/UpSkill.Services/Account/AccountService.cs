namespace UpSkill.Services.Account
{
    using Microsoft.AspNetCore.Identity; 

    using System.Security.Claims;
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Account;
    using UpSkill.Web.ViewModels.Account;

    using static UpSkill.Common.GlobalConstants;
    using static UpSkill.Common.GlobalConstants.AccountConstants;

    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AccountService(UserManager<ApplicationUser> userManager) => this.userManager = userManager;

        public async Task<Result> ChangePasswordAsync(ChangePasswordRequestModel model)
        {
            var user = await userManager.FindByEmailAsync(ClaimTypes.Email);

            if (user == null)
            {
                return Unauthorized;
            }

            var isPasswordValid = await this.userManager.CheckPasswordAsync(user, model.OldPassword);

            if (!isPasswordValid)
            {
                return WrongOldPassword;
            }

            if (model.NewPassword != model.ConfirmNewPassword)
            {
                return DifferentPasswords;
            }

            await this.userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            return true;
        }
    }
}
