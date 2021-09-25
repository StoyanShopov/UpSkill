using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using UpSkill.Common;
using UpSkill.Data.Models;

namespace UpSkill.Data.Seeding
{
    internal class UsersSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            var dbAdministrator = await userManager.FindByEmailAsync(GlobalConstants.AdministratorEmailName);

            PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();

            if (dbAdministrator == null)
            {
                var adminCompany = await dbContext.Company.FirstOrDefaultAsync(x => x.Name == GlobalConstants.AdministratorCompanyName);
                var positionAdministrator = await dbContext.Position.FirstOrDefaultAsync(x => x.Name == GlobalConstants.AdministratorPositionName);

                ApplicationUser administrator = new ApplicationUser
                {
                    UserName = "administrator",
                    NormalizedUserName = "administrator".ToUpper(),
                    Email = "administrator@test.test",
                    NormalizedEmail = "administrator@test.test".ToUpper(),
                    FirstName = "administrator",
                    LastName = "administrator",
                    Company = adminCompany,
                    Position = positionAdministrator
                };

                administrator.PasswordHash = hasher.HashPassword(administrator, "administrator");
                await userManager.CreateAsync(administrator);
                await userManager.AddToRoleAsync(administrator, GlobalConstants.AdministratorRoleName);

                var positionOwner = await dbContext.Position.FirstOrDefaultAsync(x => x.Name == GlobalConstants.OwnerPositionName);
                var motionCompany = await dbContext.Company.FirstOrDefaultAsync(x => x.Name == GlobalConstants.MotionCompanyName);

                ApplicationUser ownerMotionSoftware = new ApplicationUser
                {
                    UserName = "ownerMotionSoftware",
                    NormalizedUserName = "ownerMotionSoftware".ToUpper(),
                    Email = "ownerMotionSoftware@test.test",
                    NormalizedEmail = "ownerMotionSoftware@test.test".ToUpper(),
                    FirstName = "ownerMotionSoftware",
                    LastName = "ownerMotionSoftware",
                    Company = motionCompany,
                    Position = positionOwner,
                    Manager = administrator,
                };

                ownerMotionSoftware.PasswordHash = hasher.HashPassword(ownerMotionSoftware, "ownerMotionSoftware");
                await userManager.CreateAsync(ownerMotionSoftware);
                await userManager.AddToRoleAsync(ownerMotionSoftware, GlobalConstants.CompanyOwnerRoleName);

                var positionSoftwareDeveloper = await dbContext.Position.FirstOrDefaultAsync(x => x.Name == GlobalConstants.SoftwareDeveloperPositionName);

                ApplicationUser employeeMotionSoftware = new ApplicationUser
                {
                    UserName = "employeeMotionSoftware",
                    NormalizedUserName = "employeeMotionSoftware".ToUpper(),
                    Email = "employeeMotionSoftware@test.test",
                    NormalizedEmail = "employeeMotionSoftware@test.test".ToUpper(),
                    FirstName = "employeeMotionSoftware",
                    LastName = "employeeMotionSoftware",
                    Company = motionCompany,
                    Position = positionSoftwareDeveloper,
                    Manager = ownerMotionSoftware
                };

                employeeMotionSoftware.PasswordHash = hasher.HashPassword(employeeMotionSoftware, "employeeMotionSoftware");
                await userManager.CreateAsync(employeeMotionSoftware);
                await userManager.AddToRoleAsync(employeeMotionSoftware, GlobalConstants.CompanyEmployeeRoleName);
            }
        }
    }
}
