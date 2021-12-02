namespace UpSkill.Services.Data.Tests.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Moq;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Data.Owner;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Services.Messaging;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Company;
    using UpSkill.Web.ViewModels.Owner;
    using Xunit;

    using static UpSkill.Common.GlobalConstants.AccountConstants;
    using static UpSkill.Common.GlobalConstants.ControllersResponseMessages;
    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    public class OwnerServiceTest : TestWithData
    {
        [Theory]
        [InlineData(1, 2)]
        public void GetAllCoursesAsyncShouldReturnAllCompanyCourses(int companyId, int companyCoursesCount)
        {
            const string DatabaseName = "GetAllCoursesAsyncShouldReturnAllCompanyCourses";

            this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IRepository<CompanyCourse>>();

            var companyCourses = this.Database.CompanyCourses
                .Where(cc => cc.CompanyId == companyId).ToList();

            Assert.NotNull(companyCourses);
            Assert.Equal(companyCoursesCount, companyCourses.Count);
        }

        [Theory]
        [InlineData(1, 2)]
        public void GetAllCoachesAsyncShouldReturnAllCompanyCoaches(int companyId, int companyCoachesCount)
        {
            const string DatabaseName = "GetAllCoachesAsyncShouldReturnAllCompanyCoaches";

            this.InitializeDatabase(DatabaseName);

            var companyCoaches = this.Database.CompanyCoaches
                .Where(cc => cc.CompanyId == companyId).ToList();

            Assert.NotNull(companyCoaches);
            Assert.Equal(companyCoachesCount, companyCoaches.Count);
        }

        [Theory]
        [InlineData(3, 1, "2", "1")]
        public async Task AddCoachAsyncShouldAddNewCoachToComapany(int coachId, int companyId, string companyOwnerId, string adminId)
        {
            const string DatabaseName = "AddCoachAsyncShouldAddNewCoachToComapany";
            this.InitializeDatabase(DatabaseName);
            var companyOwner = this.Database
                .Users
                .Find(companyOwnerId);
            var admin = this.Database
                .Users
                .Find(adminId);

            var company = this.Database
                .Companies
                .Find(companyId);
            var coach = this.Database
               .Coaches
               .Find(coachId);

            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = coach.Id,
                OwnerEmail = companyOwner.Email,
            };

            var users = new List<ApplicationUser>
            {
                admin,
                companyOwner,
            };

            var service = await this.MockOwnersServices(coachId, companyId, companyOwnerId, adminId, MockUserManager(users));

            var result = await service.AddCoachAsync(companyCoach);

            Assert.True(result.Succeeded);
        }

        [Theory]
        [InlineData(3, 1, "3", "1")]
        public async Task AddCoachAsyncShouldReturnNotACompanyOwner(int coachId, int companyId, string companyOwnerId, string adminId)
        {
            const string DatabaseName = "AddCoachAsyncShouldReturnNotACompanyOwner";
            this.InitializeDatabase(DatabaseName);
            var companyOwner = this.Database
                .Users
                .Find(companyOwnerId);
            var coach = this.Database
               .Coaches
               .Find(coachId);
            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = coach.Id,
                OwnerEmail = string.Empty,
            };

            var store = new Mock<IUserStore<ApplicationUser>>();
            var mgr = new Mock<UserManager<ApplicationUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Setup(u => u.GetRolesAsync(It.IsAny<ApplicationUser>())).ReturnsAsync(new List<string>
                { AdministratorRoleName });
            mgr.Setup(u => u.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(companyOwner);
            var service = await this.MockOwnersServices(coachId, companyId, companyOwnerId, adminId, mgr);

            var result = await service.AddCoachAsync(companyCoach);

            Assert.Equal(UserNotInCompanyOwnerRole, result.Error);
            Assert.True(result.Failure);
            Assert.False(result.Succeeded);
        }

        [Theory]
        [InlineData(3, 1, "2", "1")]
        public async Task AddCoachAsyncShouldReturnDoesNotExist(int coachId, int invalidCoachId, string companyOwnerId1, string companyOwnerId2)
        {
            const string DatabaseName = "AddCoachAsyncShouldReturnDoesNotExist";
            this.InitializeDatabase(DatabaseName);
            var companyOwner = this.Database
                .Users
                .Find(companyOwnerId1);
            var companyOwner2 = this.Database
                .Users
                .Find(companyOwnerId2);
            var coach = this.Database
                .Coaches
                .Find(coachId);
            var company = this.Database
                .Companies
                .Find(companyOwner.CompanyId);
            var admin = this.Database
                .Users
                .Find("1");
            var companyCoachNoSuchCoach = new AddCoachToCompanyModel()
            {
                CoachId = invalidCoachId,
                OwnerEmail = companyOwner.Email,
            };

            var companyCoachNoSuchCompany = new AddCoachToCompanyModel()
            {
                CoachId = coach.Id,
                OwnerEmail = companyOwner2.Email,
            };
            var users = new List<ApplicationUser>
            {
                admin,
                companyOwner,
            };
            var coachViewModelMock = new CoachDetailsModel
            {
                Id = coach.Id,
                FirstName = coach.FirstName,
                CalendlyUrl = coach.CalendlyUrl,
                LastName = coach.LastName,
            };
            var coachesServiceMock = new Mock<ICoachServices>();
            coachesServiceMock.Setup(cs => cs.GetByIdAsync<CoachDetailsModel>(invalidCoachId)).ReturnsAsync(value: null);
            coachesServiceMock.Setup(cs => cs.GetByIdAsync<CoachDetailsModel>(coach.Id)).ReturnsAsync(coachViewModelMock);
            var companyServiceMock = new Mock<ICompanyService>();
            companyServiceMock.Setup(cs => cs.GetByIdAsync<CompanyDetailsModel>(company.Id)).ReturnsAsync(value: null);

            var repository = new MockRepository(MockBehavior.Strict) { DefaultValue = DefaultValue.Mock };

            var companyCoursesMock = new Mock<IRepository<CompanyCourse>>();
            companyCoursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCourses);

            var companyCoachesMock = new Mock<IRepository<CompanyCoach>>();
            companyCoachesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCoaches);

            var coursesMock = new Mock<IDeletableEntityRepository<Course>>();
            coursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.Courses);

            var emailSenderMock = new Mock<IEmailSender>();

            var userManagerMock = MockUserManager<ApplicationUser>(users).Object;

            var service = new OwnersServices(
                            companyCoursesMock.Object,
                            companyCoachesMock.Object,
                            userManagerMock,
                            coachesServiceMock.Object,
                            companyServiceMock.Object,
                            emailSenderMock.Object);

            var result = await service.AddCoachAsync(companyCoachNoSuchCoach);
            var resultNoSuchCompany = await service.AddCoachAsync(companyCoachNoSuchCompany);

            Assert.Equal(DoesNotExist, result.Error);
            Assert.True(result.Failure);
            Assert.False(result.Succeeded);
            Assert.Equal(DoesNotExist, resultNoSuchCompany.Error);
            Assert.True(resultNoSuchCompany.Failure);
            Assert.False(resultNoSuchCompany.Succeeded);
        }

        [Theory]
        [InlineData( 1, "2")]
        public async Task AddCoachAsyncShouldReturnAlreadyExistsIfACoachIsAlreadyAddedToGivenCompany(int coachId, string companyOwnerId)
        {
            const string DatabaseName = "AddCoachAsyncShouldReturnAlreadyExistsIfACoachIsAlreadyAddedToGivenCompany";
            this.InitializeDatabase(DatabaseName);
            var companyOwner = await this.Database
                .Users
                .FindAsync(companyOwnerId);

            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = coachId,
                OwnerEmail = companyOwner.Email,
            };

            var service = new Mock<IOwnerServices>();
            service.Setup(o => o.AddCoachAsync(companyCoach)).ReturnsAsync(AlreadyExist);

            var result = await service.Object.AddCoachAsync(companyCoach);

            Assert.Equal(AlreadyExist, result.Error);
            Assert.True(result.Failure);
            Assert.False(result.Succeeded);
        }

        private static Mock<UserManager<TUser>> MockUserManager<TUser>(List<TUser> ls)
            where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var mgr = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Object.UserValidators.Add(new UserValidator<TUser>());
            mgr.Object.PasswordValidators.Add(new PasswordValidator<TUser>());

            var companyOwner = ls[0];
            var admin = ls[1];

            mgr.Setup(u => u.FindByEmailAsync((companyOwner as ApplicationUser).Email)).ReturnsAsync(companyOwner);
            mgr.Setup(u => u.FindByEmailAsync((admin as ApplicationUser).Email)).ReturnsAsync(admin);
            mgr.Setup(u => u.GetRolesAsync(It.IsAny<TUser>())).ReturnsAsync(new List<string>
                { CompanyOwnerRoleName });
            mgr.Setup(u => u.IsInRoleAsync(It.IsAny<TUser>(), AdministratorRoleName)).ReturnsAsync(true);
            mgr.Setup(x => x.DeleteAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);
            mgr.Setup(x => x.CreateAsync(It.IsAny<TUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Callback<TUser, string>((x, y) => ls.Add(x));
            mgr.Setup(x => x.UpdateAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);

            return mgr;
        }

        private async Task<IOwnerServices> MockOwnersServices(
            int coachId,
            int companyId,
            string companyOwnerId,
            string adminId,
            Mock<UserManager<ApplicationUser>> userManager)
        {
            int thisCoachId = coachId;
            int thisCompanyId = companyId;
            string thisAdminId = adminId;
            string thisCompanyOwnerId = companyOwnerId;
            var admin = await this.Database
            .Users
            .FindAsync(thisAdminId);
            var companyOwner = await this.Database
                .Users
                .FindAsync(thisCompanyOwnerId);
            var company = await this.Database
                .Companies
                .FindAsync(thisCompanyId);
            var coach = await this.Database
               .Coaches
               .FindAsync(thisCoachId);
            var coachViewModelMock = new CoachDetailsModel
            {
                Id = coach.Id,
                FirstName = coach.FirstName,
                CalendlyUrl = coach.CalendlyUrl,
                LastName = coach.LastName,
            };

            var companyViewModelMock = new CompanyDetailsModel
            {
                Id = company.Id,
            };

            var users = new List<ApplicationUser>
            {
                admin,
                companyOwner,
            };

            //var userManagerMock = MockUserManager<ApplicationUser>(users).Object;

            var companyServiceMock = new Mock<ICompanyService>();
            companyServiceMock.Setup(cs => cs.GetByIdAsync<CompanyDetailsModel>(company.Id)).ReturnsAsync(companyViewModelMock);

            var coachesServiceMock = new Mock<ICoachServices>();
            coachesServiceMock.Setup(cs => cs.GetByIdAsync<CoachDetailsModel>(coach.Id)).ReturnsAsync(coachViewModelMock);

            var repository = new MockRepository(MockBehavior.Strict) { DefaultValue = DefaultValue.Mock };

            var companyCoursesMock = new Mock<IRepository<CompanyCourse>>();
            companyCoursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCourses);

            var companyCoachesMock = new Mock<IRepository<CompanyCoach>>();
            companyCoachesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCoaches);

            var coursesMock = new Mock<IDeletableEntityRepository<Course>>();
            coursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.Courses);

            var emailSenderMock = new Mock<IEmailSender>();

            var service = new OwnersServices(
                companyCoursesMock.Object,
                companyCoachesMock.Object,
                userManager.Object,
                coachesServiceMock.Object,
                companyServiceMock.Object,
                emailSenderMock.Object);

            return service;
        }
    }
}
