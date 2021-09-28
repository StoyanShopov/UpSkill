namespace UpSkill.Services.Data.Emails
{
    using System.Threading.Tasks;
    using UpSkill.Data.Models;

    public interface IEmailService
    {
        Task SendEmailConfirmation(string origin, ApplicationUser user);
    }
}
