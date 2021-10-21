namespace UpSkill.Services.Data.Employee
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeesService : IEmployeesService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> users;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ClaimsPrincipal claims;

        public EmployeesService(
            IDeletableEntityRepository<ApplicationUser> users,
            UserManager<ApplicationUser> userManager,
            ClaimsPrincipal claims)
        {
            this.users = users;
            this.userManager = userManager;
            this.claims = claims;
        }

        public async Task<Result> CreateAsync(CreateViewModel model)
        {
            var employee = await this.users
                         .All()
                         .Where(e => e.Email == model.Email)
                         .FirstOrDefaultAsync();

            if (employee != null)
            {
                return EmailExists;
            }

            var employeeFullName = model.FullName.Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();

            var employeeFirstName = employeeFullName[0];
            var employeeLastName = employeeFullName[1];

            var manager = this.GetCompanyOwner(this.claims).Result;

            var newEmployee = new ApplicationUser()
            {
                FirstName = employeeFirstName,
                LastName = employeeLastName,
                Email = model.Email,
                CompanyId = manager.CompanyId,
                ManagerId = manager.Id,
            };

            await this.users.AddAsync(newEmployee);
            await this.users.SaveChangesAsync();

            return true;
        }

        public async Task<List<TModel>> GetAllAsync<TModel>()
        {
            var owner = this.GetCompanyOwner(this.claims).Result;

            var result = await this.users
                  .AllAsNoTracking()
                  .Where(e => e.ManagerId == owner.Id &&
                              e.CompanyId == owner.CompanyId) // if the company owner has more than one compnay will they have more than one account
                  .To<TModel>()
                  .ToListAsync();

            return result;
        }

        private async Task<ApplicationUser> GetCompanyOwner(ClaimsPrincipal claims)
        {
            var manager = await this.userManager.GetUserAsync(claims);

            return manager;
        }
    }
}
