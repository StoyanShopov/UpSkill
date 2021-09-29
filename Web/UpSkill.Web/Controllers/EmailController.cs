namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Email;

    using static Common.GlobalConstants.MessagesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;

        public EmailController(IEmailService emailService)
            => this.emailService = emailService;

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string email, string token)
        {
            var result = await this.emailService.VerifyEmailAsync(email, token);

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

            var result = await this.emailService.ResendEmailConfirmationLinkAsync(email, origin);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok();
        }
    }
}
