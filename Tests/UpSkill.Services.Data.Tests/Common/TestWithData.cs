namespace UpSkill.Services.Data.Tests.Common
{
    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Fakes;

    public abstract class TestWithData
    {
        protected void InitializeDatabase(string databaseName)
        {
            var fakeDatabase = new FakeUpSkillDbContext(databaseName);

            AddFakeData(fakeDatabase);

            this.Database = fakeDatabase.Data;
        }

        protected ApplicationDbContext Database { get; private set; }

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
            });
    }
}
