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

            await AddFakeCompany(fakeDatabase);

            this.Database = fakeDatabase.Data; 
        }

        protected ApplicationDbContext Database { get; private set; }  

        private static async Task AddFakeCompany(FakeUpSkillDbContext dbContext)
            => await dbContext.AddFakeDataAsync(new Company()
            {
                Id = 1,
                Name = "TestCompany"
            },
            new ApplicationUser() 
            { 
                Id = "1", 
                Email = "user@example.com", 
                CompanyId = 0
            });
    }
}
