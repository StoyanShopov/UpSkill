namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using System.Security.Claims;
    using System.Threading.Tasks;

    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Account;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.AccountConstants;

    public class AccountController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AccountController(UserManager<ApplicationUser> userManager)
            => this.userManager = userManager;

        [HttpPost]
        [Route(ChangePasswordRoute)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            if (user == null)
            {
                return BadRequest();
            }

            var isPasswordValid = await this.userManager.CheckPasswordAsync(user, model.OldPassword);

            if (!isPasswordValid)
            {
                ModelState.AddModelError(nameof(model.OldPassword), WrongOldPassword);
            }

            if (model.NewPassword != model.ConfirmNewPassword)
            {
                ModelState.AddModelError(nameof(model.NewPassword), DifferentPasswords);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await this.userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            return Ok();
        }
    }
}
