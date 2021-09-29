namespace UpSkill.Services.Contracts.Email
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Data.Models;

    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string origin, ApplicationUser user);

        Task<Result> VerifyEmailAsync(string userId, string token);

        Task<Result> ResendEmailConfirmationLinkAsync(string email, string origin);  
    }
}
