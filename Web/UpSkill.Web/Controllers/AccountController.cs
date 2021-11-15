namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using UpSkill.Services.Contracts.Account;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.ViewModels.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountController : ApiController
    {
        private readonly IAccountService account;

        public AccountController(IAccountService account)
        {
            this.account = account;
        }

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var result = await this.account.ChangePasswordAsync(model);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info("Password changed successfully");

            return this.Ok();
        }
    }
}
