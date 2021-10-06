namespace UpSkill.Services.Contracts.SuperAdmin.Users
{
    using System.Threading.Tasks;

    public interface ISuperAdminUsersService
    {
        Task PromoteUser(string email);

        Task DemoteUser(string email);
    }
}
