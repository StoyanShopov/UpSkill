namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

    using static Common.GlobalConstants.IdentityConstants;

    public class IdentityController : ApiController
    {
        private const string JWT = "jwt";
        private const string SuccessMessage = "Success";

        private readonly IIdentityService identity;

        public IdentityController(IIdentityService identity) => this.identity = identity;

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            await ValidateRegisterModel(model);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await this.identity.RegisterAsync(model);

            return StatusCode(201);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var embededToken = await this.identity.LoginAsync(model);

            //this adds JWT to the cookie
            Response.Cookies.Append(JWT, embededToken.Token, new CookieOptions()
            {
                HttpOnly = true
            });

            return Ok(new { message = SuccessMessage });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(JWT);

            return Ok(new { message = SuccessMessage });
        }

        private async Task ValidateRegisterModel(RegisterRequestModel model)
        {
            if (await this.identity.IsEmailExist(model.Email))
            {
                ModelState.AddModelError(nameof(model.Email), EmailExist);
            }

            if (await this.identity.IsUsernameExist(model.Username))
            {
                ModelState.AddModelError(nameof(model.Username), UsernameExist);
            }

            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError(nameof(model.Password), PasswordNotMatch);
            }
        }
    }
}
