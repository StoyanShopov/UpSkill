namespace UpSkill.Services.Data.Tests.Common
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Fakes;

    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    public abstract class TestWithData
    {
        protected async Task InitializeDatabase(string databaseName)
        {
            var fakeDatabase = new FakeUpSkillDbContext(databaseName);

            await AddFakeCompany(fakeDatabase);

            await AddFakeCourse(fakeDatabase);

            this.Database = fakeDatabase.Data;
        }

        protected ApplicationDbContext Database { get; private set; }

        private static async Task AddFakeCompany(FakeUpSkillDbContext dbContext)
            => await dbContext.AddFakeDataAsync(
                new Company()
            {
                Id = 1,
                Name = "TestCompany",
            },
                new ApplicationUser()
            {
                Id = "1",
                Email = "user@example.com",
                CompanyId = 0,
            });

        private static async Task AddFakeCourse(FakeUpSkillDbContext dbContext)
            => await dbContext.AddFakeDataAsync(
            new Category()
            {
                Id = 1,
                Name = "Fake Category",
                IsDeleted = false,
            },
            new Course()
            {
                Id = 1,
                Title = "Fake Course",
                Description = "Fake Description",
                CategoryId = 1,
                IsDeleted = false,
            },
            new ApplicationRole()
            {
                Id = "1",
                Name = AdministratorRoleName,
                IsDeleted = false,
            },
            new ApplicationUser()
            {
                Id = "2",
                Email = "admin@example.com",
                CompanyId = 0,
                Roles = new List<IdentityUserRole<string>>
                    { new IdentityUserRole<string> { UserId = "2", RoleId = "1" } },
            });
    }
}
