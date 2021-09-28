namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Email;
    using UpSkill.Web.Infrastructure.Services;

    using static Common.GlobalConstants.MessagesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;
        private readonly ICurrentUserService currentUser;

        public EmailController(
            IEmailService emailService, 
            ICurrentUserService currentUser)
        {
            this.emailService = emailService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string token)
        {
            var userId = this.currentUser.GetId(); 

            var result = await this.emailService.VerifyEmailAsync(userId, token);

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
