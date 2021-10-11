namespace UpSkill.Services.Data.Tests.Fakes 
{
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data;

    public class FakeUpSkillDbContext
    {
        public FakeUpSkillDbContext(string name)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(name)
                .Options;

            this.Data = new ApplicationDbContext(options); 
        }

        public ApplicationDbContext Data { get; }  

        public async Task AddFakeDataAsync(params object[] data)
        { 
            this.Data.AddRange(data);
            await this.Data.SaveChangesAsync(); 
        } 
    }
}
