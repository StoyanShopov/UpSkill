namespace UpSkill.Services.Data.Admin
{
    using System.Threading.Tasks; 

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore; 

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.RolesNamesConstants;

    public class AdminUsersService : IAdminUsersService 
    {
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly UserManager<ApplicationUser> userManager; 

        public AdminUsersService( 
            IDeletableEntityRepository<Company> companies, 
            UserManager<ApplicationUser> userManager)
        {
            this.companies = companies;
            this.userManager = userManager;
        }

        public async Task<Result> CreateAsync(InputRequestModel model)
        {
           var companyObj = await this.companies
                .All()
                .FirstOrDefaultAsync(c => c.Name == model.Name); 

            if (companyObj != null) 
            {
                return AlreadyExist;
            }

            var company = new Company()
            {
                Name = model.Name
            };

            await this.companies.AddAsync(company);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<Result> EditAsync(UpdateRequestModel model)
        {
            Company company = await CheckCompanyExist(model.Id);
             
            if (company == null)
            {
                return DoesNotExist;
            }

            company.Name = model.Name;

            this.companies.Update(company);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(int id)
        {
            Company comapany = await CheckCompanyExist(id);

            if (comapany == null)
            {
                return DoesNotExist;
            }

            this.companies.Delete(comapany);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<Result> AddCompanyOwenerToCompanyAsync(AddCompanyOwnerRequestModel model, int id) 
        {
            var user = await this.userManager.FindByEmailAsync(model.Email); 

            Company company = await CheckCompanyExist(id); 

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

        private async Task<Company> CheckCompanyExist(int id)
            => await this.companies
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);
    }
}
