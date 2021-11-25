namespace UpSkill.Services.Data.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using UpSkill.Data.Common.Models;
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

    public class OwnerServiceTest: TestWithData
    {
        [Fact]
        public async Task GetAllCoursesAsyncShouldReturnAllCompanyCourses()
        {
            const string DatabaseName = "GetAllCompanyCourses";
            var companyId = 1;
            var companyCoursesCount = 2;

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IRepository<CompanyCourse>>();

            var companyCourses = await this.Database.CompanyCourses
                .Where(cc => cc.CompanyId == companyId).ToListAsync();

            Assert.NotNull(companyCourses);
            Assert.Equal(companyCoursesCount, companyCourses.Count);
        }

        [Fact]
        public async Task GetAllCoachesAsyncShouldReturnAllCompanyCoaches()
        {
            const string DatabaseName = "GetAllCompanyCoaches";
            var companyId = 1;
            var companyCoachesCount = 2;

            await this.InitializeDatabase(DatabaseName);

            var companyCoaches = await this.Database.CompanyCoaches
                .Where(cc => cc.CompanyId == companyId).ToListAsync();

            Assert.NotNull(companyCoaches);
            Assert.Equal(companyCoachesCount, companyCoaches.Count);
        }

        [Fact]
        public async Task AddCoachAsyncShouldAddNewCoachToComapany()
        {
            const int CoachId = 3;
            const int CompanyId = 1;
            const string CompanyOwnerId = "2";
            const string AdminId = "1";
            const string DatabaseName = "AddCoachToCompany";
            await this.InitializeDatabase(DatabaseName);
            var companyOwner = await this.Database
                .Users
                .FindAsync(CompanyOwnerId);
            var admin = await this.Database
                .Users
                .FindAsync(AdminId);

            var company = await this.Database
                .Companies
                .FindAsync(CompanyId);
            var coach = await this.Database
               .Coaches
               .FindAsync(CoachId);

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

            var service = await this.MockOwnersServices(CoachId, CompanyId, CompanyOwnerId, AdminId, MockUserManager(users));

            var result = await service.AddCoachAsync(companyCoach);

            Assert.True(result.Succeeded);
        }

        [Fact]
        public async Task AddCoachAsyncShouldReturnNotACompanyOwner()
        {
            const int CoachId = 3;
            const string CompanyOwnerId = "3";
            const int CompanyId = 1;
            const string AdminId = "1";
            const string DatabaseName = "AddCoachToCompany";
            await this.InitializeDatabase(DatabaseName);
            var companyOwner = await this.Database
                .Users
                .FindAsync(CompanyOwnerId);
            var coach = await this.Database
               .Coaches
               .FindAsync(CoachId);
            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = coach.Id,
                OwnerEmail = "",
            };

            //var service = new Mock<IOwnerServices>();
            //service.Setup(o => o.AddCoachAsync(companyCoach)).ReturnsAsync(UserNotInCompanyOwnerRole);

            //var result = await service.Object.AddCoachAsync(companyCoach);
            var store = new Mock<IUserStore<ApplicationUser>>();
            var mgr = new Mock<UserManager<ApplicationUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Setup(u => u.GetRolesAsync(It.IsAny<ApplicationUser>())).ReturnsAsync(new List<string>
                { AdministratorRoleName });
            var service = await this.MockOwnersServices(CoachId, CompanyId, CompanyOwnerId, AdminId, mgr);

            var result = await service.AddCoachAsync(companyCoach);

            Assert.Equal(UserNotInCompanyOwnerRole,result.Error);
            Assert.True(result.Failure);
            Assert.False(result.Succeeded);
        }

        [Fact]
        public async Task AddCoachAsyncShouldReturnDoesNotExist()
        {
            const int CoachId = 3;
            const int InvalidCoachId = 1;
            const string CompanyOwnerId1 = "2";
            const string CompanyOwnerId2 = "1";
            const string DatabaseName = "AddCoachToCompany";
            await this.InitializeDatabase(DatabaseName);
            var companyOwner = await this.Database
                .Users
                .FindAsync(CompanyOwnerId1);
            var companyOwner2 = await this.Database
                .Users
                .FindAsync(CompanyOwnerId2);
            var coach = await this.Database
                .Coaches
                .FindAsync(CoachId);
            var company = await this.Database
                .Companies
                .FindAsync(companyOwner.CompanyId);
            var admin = await this.Database
                .Users
                .FindAsync("1");
            var companyCoachNoSuchCoach = new AddCoachToCompanyModel()
            {
                CoachId = InvalidCoachId,
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
            coachesServiceMock.Setup(cs => cs.GetByIdAsync<CoachDetailsModel>(InvalidCoachId)).ReturnsAsync(value: null);
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
            //service.Setup(o => o.AddCoachAsync(companyCoachNoSuchCoach)).ReturnsAsync(DoesNotExist);
            //service.Setup(o => o.AddCoachAsync(companyCoachNoSuchCompany)).ReturnsAsync(DoesNotExist);

            var result = await service.AddCoachAsync(companyCoachNoSuchCoach);
            var resultNoSuchCompany = await service.AddCoachAsync(companyCoachNoSuchCompany);

            Assert.Equal(DoesNotExist, result.Error);
            Assert.True(result.Failure);
            Assert.False(result.Succeeded);
            Assert.Equal(DoesNotExist, resultNoSuchCompany.Error);
            Assert.True(resultNoSuchCompany.Failure);
            Assert.False(resultNoSuchCompany.Succeeded);
        }

        [Fact]
        public async Task AddCoachAsyncShouldReturnAlreadyExistsIfACoachIsAlreadyAddedToGivenCompany()
        {
            const int CoachId = 1;
            const string CompanyOwnerId = "2";
            const string DatabaseName = "AddCoachToCompany";
            await this.InitializeDatabase(DatabaseName);
            var companyOwner = await this.Database
                .Users
                .FindAsync(CompanyOwnerId);

            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = CoachId,
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
