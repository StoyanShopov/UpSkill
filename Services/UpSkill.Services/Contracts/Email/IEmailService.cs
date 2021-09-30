namespace UpSkill.Services.Contracts.Email
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Data.Models;

    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string origin, string host, ApplicationUser user);

        Task<Result> VerifyEmailAsync(string userId, string token);

        Task<Result> ResendEmailConfirmationLinkAsync(string email, string host, string origin);  
    }
}
