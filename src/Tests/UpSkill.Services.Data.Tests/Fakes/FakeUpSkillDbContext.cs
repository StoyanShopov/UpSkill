namespace UpSkill.Services.Data.Tests.Fakes
{
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

        public void AddFakeData(params object[] data)
        {
            this.Data.AddRange(data);
            this.Data.SaveChanges();
        }
    }
}
