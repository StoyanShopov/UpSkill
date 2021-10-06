namespace UpSkill.Services.SuperAdmin.Users
{
    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.SuperAdmin.Users;
    public class SuperAdminUsersService : ISuperAdminUsersService
    {
        public SuperAdminUsersService()
        {
        }

        public Task DemoteUser(string email)
        {
            throw new System.NotImplementedException();
        }

        public Task PromoteUser(string email)
        {
            throw new System.NotImplementedException();
        }
    }
}
