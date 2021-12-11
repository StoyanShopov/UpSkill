namespace UpSkill.Data.Seeding
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using UpSkill.Data.Models;

    using static UpSkill.Common.GlobalConstants.CompaniesNamesConstants;
    using static UpSkill.Common.GlobalConstants.PositionsNamesConstants;
    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;
    using static UpSkill.Common.GlobalConstants.UsersEmailsNames;

    internal class UsersSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            var dbAdministrator = await userManager.FindByEmailAsync(AdministratorEmailName);
            var dbOwnerMotionSoftware = await userManager.FindByEmailAsync(OwnerMotionSoftwareEmailName);
            var dbEmployeeMotionSoftware = await userManager.FindByEmailAsync(EmployeeMotionSoftwareEmailName);

            if (dbAdministrator == null
                && dbOwnerMotionSoftware == null
                && dbEmployeeMotionSoftware == null)
            {
                var adminCompany = await dbContext.Companies
                    .FirstOrDefaultAsync(x => x.Name == AdministratorCompanyName);
                var positionAdministrator = await dbContext
                    .Positions.FirstOrDefaultAsync(x => x.Name == AdministratorPositionName);

                ApplicationUser administrator = CreateAdministrator(adminCompany, positionAdministrator);

                await userManager.CreateAsync(administrator, "administrator");
                await userManager.AddToRoleAsync(administrator, AdministratorRoleName);

                var coachCompany = await dbContext.Companies
                   .FirstOrDefaultAsync(x => x.Name == MotionCompanyName);
                var positionCoach = await dbContext
                    .Positions.FirstOrDefaultAsync(x => x.Name == GraphicDesignerPositionName);

                ApplicationUser coach = CreateCoach(coachCompany, positionCoach);

                await userManager.CreateAsync(coach, "coachTest");
                await userManager.AddToRoleAsync(coach, CoachRoleName);

                var positionOwner = await dbContext.Positions
                    .FirstOrDefaultAsync(x => x.Name == OwnerPositionName);
                var motionCompany = await dbContext.Companies
                    .FirstOrDefaultAsync(x => x.Name == MotionCompanyName);

                ApplicationUser ownerMotionSoftware = CreateOwnerMotionSoftware(administrator, positionOwner, motionCompany);

                await userManager.CreateAsync(ownerMotionSoftware, "ownerMotionSoftware");
                await userManager.AddToRoleAsync(ownerMotionSoftware, CompanyOwnerRoleName);

                var positionSoftwareDeveloper = await dbContext.Positions
                    .FirstOrDefaultAsync(x => x.Name == SoftwareDeveloperPositionName);

                ApplicationUser employeeMotionSoftware = CreateEmployeeMotionSoftware(motionCompany, ownerMotionSoftware, positionSoftwareDeveloper);

                await userManager.CreateAsync(employeeMotionSoftware, "employeeMotionSoftware");
                await userManager.AddToRoleAsync(employeeMotionSoftware, CompanyEmployeeRoleName);
            }
        }

        private static ApplicationUser CreateEmployeeMotionSoftware(Company motionCompany, ApplicationUser ownerMotionSoftware, Position positionSoftwareDeveloper)
        {
            return new ApplicationUser
            {
                UserName = "employeeMotionSoftware",
                NormalizedUserName = "employeeMotionSoftware".ToUpper(),
                Email = "employeeMotionSoftware@test.test",
                NormalizedEmail = "employeeMotionSoftware@test.test".ToUpper(),
                EmailConfirmed = true,
                FirstName = "employeeMotionSoftware",
                LastName = "employeeMotionSoftware",
                Company = motionCompany,
                Position = positionSoftwareDeveloper,
                Manager = ownerMotionSoftware,
            };
        }

        private static ApplicationUser CreateOwnerMotionSoftware(ApplicationUser administrator, Position positionOwner, Company motionCompany)
        {
            return new ApplicationUser
            {
                UserName = "ownerMotionSoftware",
                NormalizedUserName = "ownerMotionSoftware".ToUpper(),
                Email = "ownerMotionSoftware@test.test",
                NormalizedEmail = "ownerMotionSoftware@test.test".ToUpper(),
                EmailConfirmed = true,
                FirstName = "ownerMotionSoftware",
                LastName = "ownerMotionSoftware",
                Company = motionCompany,
                Position = positionOwner,
                Manager = administrator,
            };
        }

        private static ApplicationUser CreateCoach(Company coachCompany, Position positionCoach)
        {
            return new ApplicationUser
            {
                UserName = "coach",
                NormalizedUserName = "coach".ToUpper(),
                Email = "coach@test.test",
                NormalizedEmail = "coach@test.test".ToUpper(),
                EmailConfirmed = true,
                FirstName = "coach",
                LastName = "coach",
                Company = coachCompany,
                Position = positionCoach,
            };
        }

        private static ApplicationUser CreateAdministrator(Company adminCompany, Position positionAdministrator)
        {
            return new ApplicationUser
            {
                UserName = "administrator",
                NormalizedUserName = "administrator".ToUpper(),
                Email = "administrator@test.test",
                NormalizedEmail = "administrator@test.test".ToUpper(),
                EmailConfirmed = true,
                FirstName = "administrator",
                LastName = "administrator",
                Company = adminCompany,
                Position = positionAdministrator,
            };
        }
    }
}
