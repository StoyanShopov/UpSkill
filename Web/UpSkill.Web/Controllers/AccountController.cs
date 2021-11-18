namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Account;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.ViewModels.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountController : ApiController
    {
        private readonly IAccountService account;
        private readonly INLogger nLog;

        public AccountController(
            IAccountService account,
            INLogger nLog)
        {
            this.account = account;
            this.nLog = nLog;
        }

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var result = await this.account.ChangePasswordAsync(model);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info("Password changed successfully");

            return this.Ok();
        }
    }
}
