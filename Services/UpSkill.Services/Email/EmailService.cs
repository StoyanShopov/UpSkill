namespace UpSkill.Services.Email
{
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.WebUtilities;

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Email;
    using UpSkill.Services.Messaging;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.EmailSenderConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class EmailService : IEmailService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEmailSender emailSender;

        public EmailService(
            UserManager<ApplicationUser> userManager,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.emailSender = emailSender;
        }

        public async Task SendEmailConfirmationAsync(string origin, ApplicationUser user)
        {
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = string.Format(
                VerifyUrl,
                origin,
                EmailControllerName,
                VerifyEmailRoute,
                token,
                user.Email);

            var content = string.Format(HtmlContent, verifyUrl);

            await emailSender.SendEmailAsync(FromEmail, EmailSubject, user.Email, EmailSubject, content);
        }

        public async Task<Result> VerifyEmailAsync(string email, string token) 
        {
            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Unauthorized;
            }

            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

            var result = await this.userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded)
            {
                return IncorrectEmail;
            } 

            return true; 
        }

        public async Task<Result> ResendEmailConfirmationLinkAsync(string email, string origin)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return EmailsDoNotMatch;
            }

            await SendEmailConfirmationAsync(origin, user);

            return true;
        }
    }
}
