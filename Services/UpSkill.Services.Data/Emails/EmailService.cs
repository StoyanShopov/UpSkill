namespace UpSkill.Services.Data.Emails
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.WebUtilities;

    using System.Text;
    using System.Threading.Tasks;

    using UpSkill.Data.Models;
    using UpSkill.Services.Messaging;

    using static Common.GlobalConstants.EmailSenderConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

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

        public async Task SendEmailConfirmation(string origin, ApplicationUser user)
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

            var message = string.Format(HtmlContent, verifyUrl);

            await emailSender.SendEmailAsync(FromEmail, EmailSubject, user.Email, message, verifyUrl);
        }
    }
}
