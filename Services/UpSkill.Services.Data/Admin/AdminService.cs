namespace UpSkill.Services.Data.Admin
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;
    using static Common.GlobalConstants.RolesNamesConstants;

    public class AdminService : IAdminService
    {
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminService(
            IDeletableEntityRepository<Company> companies,
            UserManager<ApplicationUser> userManager)
        {
            this.companies = companies;
            this.userManager = userManager;
        }

        public async Task<Result> AddCompanyOwnerToCompanyAsync(AddCompanyOwnerRequestModel model, int id)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            var company = await this.companies
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            var userRoles = await this.userManager.GetRolesAsync(user);

            if (!userRoles.Contains(CompanyOwnerRoleName))
            {
                return UserDoNotExist;
            }

            if (company == null)
            {
                return DoesNotExist;
            }

            user.CompanyId = company.Id;

            company.Users.Add(user);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<string> Promote(ApplicationUser user)
        {
            var roles = await this.userManager.GetRolesAsync(user);

            if (roles.Contains(CompanyOwnerRoleName))
            {
                return AlreadyAssignedToRole;
            }

            await this.userManager.AddToRoleAsync(user, CompanyOwnerRoleName);

            return AssignedSuccessfully;
        }

        public async Task<string> Demote(ApplicationUser user)
        {
            var demotion = await this.userManager.RemoveFromRoleAsync(user, CompanyOwnerRoleName);

            if (!demotion.Succeeded)
            {
                return AlreadyAssignedToRole;
            }

            return UnassignedSuccessfully;
        }
    }
}
