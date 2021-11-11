namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
     
    using UpSkill.Services.Contracts.Email;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;
        private readonly ILogger<EmailController> logger;

        public EmailController(
            IEmailService emailService,
            ILogger<EmailController> logger)
        {
            this.emailService = emailService;
            this.logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string email, string token)
        {
            var result = await this.emailService.VerifyEmailAsync(email, token);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation(EmailConfirmed);

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
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation(this.Ok().StatusCode.ToString());

            return this.Ok();
        }
    }
}
