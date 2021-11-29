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
                Id = "3",
                Email = "",
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
             },
                new Coach() 
                {
                    Id=3,
                    FirstName="Stanimir",
                    LastName = "Stanimir",
                    Field="Marketing",
                });

    }
}
