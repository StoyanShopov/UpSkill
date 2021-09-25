using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

            PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();

            List<ApplicationUser> users = new List<ApplicationUser>();

            
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
                UserName = "ownerOfMotionSoftware",
                NormalizedUserName = "ownerOfMotionSoftware".ToUpper(),
                Email = "ownerOfMotionSoftware@test.test",
                NormalizedEmail = "ownerOfMotionSoftware@test.test".ToUpper(),
                FirstName = "ownerOfMotionSoftware",
                LastName = "ownerOfMotionSoftware",
                Company = motionCompany,
                Position = positionOwner,
                Manager = administrator,
            };

            ownerMotionSoftware.PasswordHash = hasher.HashPassword(ownerMotionSoftware, "ownerOfMotionSoftware");
            await userManager.CreateAsync(ownerMotionSoftware);
            await userManager.AddToRoleAsync(ownerMotionSoftware, GlobalConstants.CompanyOwnerRoleName);

            var positionSoftwareDeveloper = await dbContext.Position.FirstOrDefaultAsync(x => x.Name == GlobalConstants.SoftwareDeveloperPositionName);

            ApplicationUser employeeInMotionSoftware = new ApplicationUser
               {
                   UserName = "employeeInMotionSoftware",
                   NormalizedUserName = "employeeInMotionSoftware".ToUpper(),
                   Email = "employeeInMotionSoftware@test.test",
                   NormalizedEmail = "employeeInMotionSoftware@test.test".ToUpper(),
                   FirstName = "employeeInMotionSoftware",
                   LastName = "employeeInMotionSoftware",
                   Company = motionCompany,
                   Position = positionSoftwareDeveloper,
                   Manager = ownerMotionSoftware
            };

            employeeInMotionSoftware.PasswordHash = hasher.HashPassword(employeeInMotionSoftware, "employeeInMotionSoftware");
            await userManager.CreateAsync(employeeInMotionSoftware);
            await userManager.AddToRoleAsync(employeeInMotionSoftware, GlobalConstants.CompanyEmployeeRoleName);
        }
    }
}
