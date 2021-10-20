namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Email;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;

        public EmailController(IEmailService emailService) => this.emailService = emailService;

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string email, string token)
        {
            var result = await this.emailService.VerifyEmailAsync(email, token);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(EmailConfirmed);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(ResendEmailConfirmationLinkRoute)]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var origin = this.Request.Headers[HeaderOrigin];
            var host = this.Request.Host.Value;

            var result = await this.emailService.ResendEmailConfirmationLinkAsync(email, host, origin);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
