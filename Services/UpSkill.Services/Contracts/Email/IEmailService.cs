namespace UpSkill.Services.Contracts.Email
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Data.Models;

    public interface IEmailService
    {
        Task SendEmailConfirmation(string origin, ApplicationUser user);

        Task<Result> VerifyEmailAsync(string userId, string token);

        Task<Result> ResendEmailConfirmationLink(string email, string origin);  
    }
}
