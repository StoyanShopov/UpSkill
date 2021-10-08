namespace UpSkill.Services.SuperAdmin.Users
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;

    using Data.Models;
    using Contracts.Admin.Users;

    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.RolesNamesConstants;

    public class AdminUsersService : IAdminUsersService
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AdminUsersService(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<string> Promote(ApplicationUser user)
        {
            var roles = await this.userManager.GetRolesAsync(user);

            if (roles.Contains(CompanyOwnerRoleName))
            {
                return AlreadyAssignedToRole;
            }

            var promotion = await this.userManager
                                      .AddToRoleAsync(user, CompanyOwnerRoleName);

            return AssignedSuccessfully;
        }


        public async Task<string> Demote(ApplicationUser user)
        {
            var demotion = await this.userManager
                                     .RemoveFromRoleAsync(user, CompanyOwnerRoleName);

            if (!demotion.Succeeded)
            {
                return AlreadyAssignedToRole;
            }

            return UnassignedSuccessfully;
        }
    }
}
