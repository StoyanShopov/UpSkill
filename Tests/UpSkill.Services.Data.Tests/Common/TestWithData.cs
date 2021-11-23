namespace UpSkill.Services.Data.Tests.Common
{
    using System.Threading.Tasks;

    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Fakes;

    public abstract class TestWithData
    {
        protected async Task InitializeDatabase(string databaseName)
        {
            var fakeDatabase = new FakeUpSkillDbContext(databaseName);

            await AddFakeData(fakeDatabase);

            this.Database = fakeDatabase.Data;
        }

        protected ApplicationDbContext Database { get; private set; }

        private static async Task AddFakeData(FakeUpSkillDbContext dbContext)
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
            },
                new ApplicationUser()
            {
                Id = "2",
                Email = "user2@example.com",
                CompanyId = 1,
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
             });

    }
}
