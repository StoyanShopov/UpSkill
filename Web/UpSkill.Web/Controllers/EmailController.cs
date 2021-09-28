namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Email;
    using UpSkill.Data.Models;

    using static Common.GlobalConstants.MessagesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;
        private readonly UserManager<ApplicationUser> userManager;

        public EmailController(
            IEmailService emailService, 
            UserManager<ApplicationUser> userManager)
        {
            this.emailService = emailService;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return BadRequest();
            }

            var result = await this.emailService.VerifyEmailAsync(user.Id, token);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok(EmailConfirmed);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(ResendEmailConfirmationLinkRoute)]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var origin = Request.Headers[HeaderOrigin];

            var result = await this.emailService.ResendEmailConfirmationLink(email, origin);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok();
        }
    }
}
