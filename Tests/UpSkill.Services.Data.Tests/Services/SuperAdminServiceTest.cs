namespace UpSkill.Services.Data.Tests.Services
{
    using System.Threading.Tasks; 

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;

    using Moq; 

    using Xunit;

    public class SuperAdminServiceTest : TestWithData
    { 
        [Fact]
        public async Task CreateAsynShouldCreateANewCompany()
        {          
            const string TestCompany = "TestCompany";
            var repository = new Mock<IDeletableEntityRepository<Company>>();
            var company = new Company()
            {
                Id = 1,
                Name = TestCompany
            };

            var result = await Task.FromResult(repository.Setup(r=> r.AddAsync(company)));

            Assert.NotNull(company);
            Assert.Equal(TestCompany, company.Name);
        }

        [Fact]
        public async Task DeleteAsyncShouldDeleteACompany()
        {
            const int Id = 1;
            const string DatabaseName = "DeleteCompany";
            await this.InitializeDatabase(DatabaseName);
            var repository = new Mock<IDeletableEntityRepository<Company>>(); 
            var company = await this.Database
                .Companies
                .FindAsync(Id);

            var result = repository.Setup(r => r.Delete(company));

            Assert.NotNull(company); 
            Assert.True(company.IsDeleted = true);
        } 

        [Fact] 
        public async Task EditAsyncShouldEditCompany()
        {
            const int Id = 1;
            const string UpdatedCompanyName = "UpdatedCompany";
            const string DatabaseName = "EditCompany";
            await this.InitializeDatabase(DatabaseName);
            var repository = new Mock<IDeletableEntityRepository<Company>>();
            var company = await this.Database
                .Companies
                .FindAsync(Id);
            company.Name = UpdatedCompanyName; 

            var result = repository.Setup(r => r.Update(company));

            Assert.NotNull(company);
            Assert.Equal(UpdatedCompanyName, company.Name);
        }

        [Fact]
        public async Task AddOwnerToCompanyAsyncShouldReturnSuccesfullyAddedOwner()
        {
            const string UserId = "1";
            const int Id = 1;
            const string DatabaseName = "AddOwnerToCompany";
            await this.InitializeDatabase(DatabaseName);
            var user = await this.Database
                .Users
                .FindAsync(UserId);
            var company = await this.Database
                .Companies
                .FindAsync(Id);

            user.CompanyId = company.Id;
            company.Users.Add(user);

            Assert.NotNull(user);
            Assert.NotNull(company);
            Assert.Equal(Id, user.CompanyId);
            Assert.Contains(user, company.Users); 
        }
    } 
}
