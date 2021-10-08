namespace UpSkill.Services.Contracts.Admin.Users
{
    using System.Threading.Tasks;
    using UpSkill.Data.Models;

    public interface IAdminUsersService
    {
        Task<string> Promote(ApplicationUser user);

        Task<string> Demote(ApplicationUser user);
    }
}
