namespace UpSkill.Services.Contracts.SuperAdmin.Users
{
    using System.Threading.Tasks;

    public interface ISuperAdminUsersService
    {
        Task UpdateUser(string email,string keyword);
    }
}
