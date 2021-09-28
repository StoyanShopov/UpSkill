namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.WebUtilities;

    using System.Text;
    using System.Threading.Tasks;

    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Emails;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class EmailController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEmailService emailService;

        public EmailController(
            UserManager<ApplicationUser> userManager,
            IEmailService emailService)
        {
            this.userManager = userManager;
            this.emailService = emailService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string userId, string token)
        {
            var user = await this.userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

            var result = await this.userManager.ConfirmEmailAsync(user, decodedToken);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(ResendEmailConfirmationLinkRoute)]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return BadRequest();
            }

            var origin = Request.Headers[HeaderOrigin];

            await this.emailService.SendEmailConfirmation(origin, user);

            return Ok();
        }
    }
}
