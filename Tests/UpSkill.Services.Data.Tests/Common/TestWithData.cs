namespace UpSkill.Services.Data.Tests.Common
{
    using System.Collections.Generic;
    using System.Security.Claims;

    using Microsoft.AspNetCore.Identity;

    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Fakes;

    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    public abstract class TestWithData
    {
        protected void InitializeDatabase(string databaseName)
        {
            var fakeDatabase = new FakeUpSkillDbContext(databaseName);

            AddFakeData(fakeDatabase);

            this.Database = fakeDatabase.Data;
        }

        protected ApplicationDbContext Database { get; private set; }

        public static ApplicationUser InitializeFakeUserWithRoles(ApplicationRole role)
        {
            var claim = new Claim(CompanyOwnerRoleName, CompanyOwnerRoleName);
            var identityUser = new IdentityUserClaim<string>();
            var identityUserRole = new IdentityUserRole<string>();
            identityUser.InitializeFromClaim(claim);
            identityUserRole.RoleId = role.Id;
            ApplicationUser user = new ApplicationUser
            {
                UserName = "testEmail@abv.bg",
                NormalizedUserName = "testEmail@abv.bg".ToUpper(),
                Email = "testEmail@abv.bg",
                NormalizedEmail = "testEmail@abv.bg".ToUpper(),
                EmailConfirmed = true,
                FirstName = "TestFirstName",
                LastName = "TestLastName",
                CompanyId = 1,
                Claims = new List<IdentityUserClaim<string>> { identityUser },
            };

            identityUserRole.UserId = user.Id;
            user.Roles = new List<IdentityUserRole<string>> { identityUserRole };

            return user;
        }

        private static void AddFakeData(FakeUpSkillDbContext dbContext)
            => dbContext.AddFakeData(
                new Company()
            {
                Id = 1,
                Name = "TestCompany",
            },
                new Coach()
                {
                    Id = 1,
                    FirstName = "TestFirstName",
                    LastName = "TestLastName",
                    Field = "1",
                    Price = 100,
                },
                new ApplicationUser()
            {
                Id = "1",
                Email = "user@example.com",
                CompanyId = 0,
            },
                new ApplicationUser()
            {
                Id = "3",
                Email = string.Empty,
                CompanyId = 0,
            },

                new ApplicationRole
            {
                Id = "1",
                Name = "Admin",
                NormalizedName = "Admin".ToUpper(),
            },
                new ApplicationUser()
           {
                Id = "2",
                FirstName = "TestFirstName",
                LastName = "TestLastName",
                Email = "testEmail@abv.bg",
                NormalizedEmail = "testEmail@abv.bg".ToUpper(),
                CompanyId = 1,
                PasswordHash = "AQAAAAEAACcQAAAAEPApfGLDptLhrGFgXEVwUGu8aXMoxGjrOP8CAjVsjRSnQ3S68UP95bEu4S7yv+EQAw==",
                EmailConfirmed = true,
                UserName = "testEmail@abv.bg",
                NormalizedUserName = "testEmail@abv.bg".ToUpper(),
           },
                new Position()
           {
                Id = 1,
                Name = "Owner",
           },
                new Course()
            {
                Id = 1,
                Title = "Title",
                Description = "Description",
                Price = 12,
                CoachId = 1,
                CategoryId = 1,
            },
                new Course()
            {
                Id = 2,
                Title = "Titl2e",
                Description = "Descri2ption",
                Price = 122,
                CoachId = 2,
                CategoryId = 2,
            },
                new CompanyCourse()
            {
                CompanyId = 1,
                CourseId = 2,
            },
                new CompanyCourse()
             {
                 CompanyId = 1,
                 CourseId = 1,
             },
                new CompanyCoach()
             {
                CompanyId = 1,
                CoachId = 2,
             },
                new CompanyCoach()
             {
                CompanyId = 1,
                CoachId = 1,
             },
                new Coach()
                {
                    Id = 3,
                    FirstName = "Stanimir",
                    LastName = "Stanimir",
                    Field = "Marketing",
                });
    }
}
