namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Web.ViewModels.Account;
    using UpSkill.Services.Contracts.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountController : ApiController
    {
        private readonly IAccountService account;

        public AccountController(IAccountService account) => this.account = account;

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var result = await this.account.ChangePasswordAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok();
        }
    }
}
