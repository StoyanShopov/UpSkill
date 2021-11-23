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

            var service = await this.MockOwnersServices(CoachId, CompanyId, CompanyOwnerId, AdminId);
            var companyCoach = new AddCoachToCompanyModel()
            {
                CoachId = coach.Id,
                OwnerEmail=companyOwner.Email,
            };

            var result = await service.AddCoachAsync(companyCoach);

            Assert.True(result.Succeeded);

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

        private async Task<IOwnerServices> MockOwnersServices(int coachId, int companyId, string companyOwnerId, string adminId)
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

            var userManagerMock = MockUserManager<ApplicationUser>(users).Object;

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
                userManagerMock,
                coachesServiceMock.Object,
                companyServiceMock.Object,
                emailSenderMock.Object);

            return service;
        }
    }
}
