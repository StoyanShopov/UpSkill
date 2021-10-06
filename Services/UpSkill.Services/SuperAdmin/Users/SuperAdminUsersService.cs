namespace UpSkill.Services.SuperAdmin.Users
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Data.Common.Repositories;
    using Data.Models;
    using Contracts.SuperAdmin.Users;

    using static Common.GlobalConstants.RolesNamesConstants;

    public class SuperAdminUsersService : ISuperAdminUsersService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> usersRepository;
        private readonly UserManager<ApplicationUser> userManager;

        public SuperAdminUsersService(
            IDeletableEntityRepository<ApplicationUser> usersRepository,
            UserManager<ApplicationUser> userManager)
        {
            this.usersRepository = usersRepository;
            this.userManager = userManager;
        }

        //TODO a lot
        public async Task UpdateUser(string email, string keyword)
        {
            var user = await this.usersRepository
               .All()
               .Where(u => u.Email == email)
               .FirstOrDefaultAsync();

            //should do it on front-end
            if (user == null)
            {
                throw new ArgumentNullException("User not found!");
            }

            if (keyword == "promote".ToLower())
            {
                if (await CheckIfRoleExists(user))
                {
                    throw new Exception("User is already promoted as owner");
                }

                var promotion = await this.userManager.AddToRoleAsync(user, CompanyOwnerRoleName);
            }

            else if (keyword == "demote".ToLower())
            {
                if (!await CheckIfRoleExists(user))
                {
                    throw new Exception("User is already demoted as user");
                }

                var demotion = await this.userManager.RemoveFromRoleAsync(user, CompanyOwnerRoleName);
            }

            await this.usersRepository.SaveChangesAsync();
        }

        private async Task<bool> CheckIfRoleExists(ApplicationUser user)
        {
            var roles = await this.userManager.GetRolesAsync(user);

            return roles.Contains(CompanyOwnerRoleName);
        }
    }
}
