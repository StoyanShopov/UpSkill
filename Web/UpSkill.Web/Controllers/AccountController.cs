namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Account;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountController : ApiController
    {
        private readonly IAccountService account;
        private readonly ICurrentUserService currentUser;
        private readonly INLogger nlog;

        public AccountController(
            IAccountService account,
            ICurrentUserService currentUser,
            INLogger nlog)
        {
            this.account = account;
            this.currentUser = currentUser;
            this.nlog = nlog;
        }

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var result = await this.account.ChangePasswordAsync(model, this.currentUser.GetId());

            if (result.Failure)
            {
                this.nlog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info("Password changed successfully");

            return this.Ok();
        }
    }
}
