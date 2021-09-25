namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;

    using System.Threading.Tasks;
    using System.Security.Claims;

    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Services.Messaging;
    using UpSkill.Web.ViewModels.Identity;

    using static Common.GlobalConstants.IdentityConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class IdentityController : ApiController
    {
        private readonly IIdentityService identity;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEmailSender emailSender;

        public IdentityController(
            IIdentityService identity,
            UserManager<ApplicationUser> userManager,
            IEmailSender emailSender)
        {
            this.identity = identity;
            this.userManager = userManager;
            this.emailSender = emailSender;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(RegisterRoute)]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            await ValidateRegisterModel(model);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUserRegistered = await this.identity.RegisterAsync(model);

            if (!isUserRegistered)
            {
                return BadRequest();
            }

            await SendEmail(model.Email);

            return StatusCode(201);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(LoginRoute)]
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

            return Ok(embededToken);
        }

        [HttpPost]
        [Authorize]
        [Route(LogoutRoute)]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(JWT);

            return Ok(new { message = SuccessMessage });
        }

        [HttpGet]
        [Authorize]
        [Route(UserRoute)]
        public async Task<LoginResponseModel> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new LoginResponseModel
            {
                Id = user.Id,
                Email = user.Email,
            };
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string userId, string token)
        {
            var user = await this.userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            var result = await this.userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }

        private async Task SendEmail(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            var emailConfirmationToken = await this.userManager.GenerateEmailConfirmationTokenAsync(user);

            if (!string.IsNullOrWhiteSpace(emailConfirmationToken))
            {
                var linkToConfirm = Url.Action(
                    "verifyEmail",
                    "identity",
                    new { userId = user.Id, token = emailConfirmationToken },
                    Request.Scheme,
                    Request.Host.ToString());

                await this.emailSender.SendEmailAsync(
                    "vasiltatarov3@gmail.com",
                    "Test",
                    email,
                    "Verify Email",
                    $"<a href=\"{linkToConfirm}\"></a>");
            }
        }

        private async Task ValidateRegisterModel(RegisterRequestModel model)
        {
            if (await this.userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError(nameof(model.Email), EmailExist);
            }

            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError(nameof(model.Password), PasswordNotMatch);
            }
        }
    }
}
