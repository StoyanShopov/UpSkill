namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Contracts.Account;
    using UpSkill.Web.ViewModels.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountController : ApiController
    {
        private readonly IAccountService account;
        private readonly ILogger<AccountController> logger;

        public AccountController(
            IAccountService account,
            ILogger<AccountController> logger)
        {
            this.account = account;
            this.logger = logger;
        }

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            this.logger.LogInformation("Entering ChangePassword action (user)");

            var result = await this.account.ChangePasswordAsync(model);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Password changed successfully (user)");

            return this.Ok();
        }
    }
}
