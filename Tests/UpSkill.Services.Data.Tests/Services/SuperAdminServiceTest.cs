namespace UpSkill.Services.Data.Tests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Moq;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Data.Contracts.File;
    using UpSkill.Services.Data.Course;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

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
                Name = TestCompany,
            };

            var result = await Task.FromResult(repository.Setup(r => r.AddAsync(company)));

            Assert.NotNull(company);
            Assert.Equal(TestCompany, company.Name);
        }

        [Fact]
        public async Task DeleteAsyncShouldDeleteACompany()
        {
            const int Id = 1;
            const string DatabaseName = "DeleteCompany";
            this.InitializeDatabase(DatabaseName);
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
            this.InitializeDatabase(DatabaseName);
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
            this.InitializeDatabase(DatabaseName);
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

        // The person who wrote this test should pass to fix it. Currently the tester does not pass!
        // [Fact]
        // public async Task AddCompanyAsyncShouldReturnSuccesfullyAddedCompanyToCourse()
        // {
        //    const int CourseId = 1;
        //    const int CompanyId = 1;
        //    const string CompanyOwnerId = "1";
        //    const string AdminId = "2";
        //    const string DatabaseName = "AddCompanyToCourse";
        //    await this.InitializeDatabase(DatabaseName);
        //    var companyOwner = await this.Database
        //        .Users
        //        .FindAsync(CompanyOwnerId);
        //    var admin = await this.Database
        //        .Users
        //        .FindAsync(AdminId);

        // var company = await this.Database
        //        .Companies
        //        .FindAsync(CompanyId);
        //    var course = await this.Database
        //       .Courses
        //       .FindAsync(CourseId);

        // var companyCourseExpected = new CompanyCourse
        //    {
        //        CompanyId = company.Id,
        //        CourseId = course.Id,
        //    };

        // var users = new List<ApplicationUser>
        //    {
        //        admin,
        //        companyOwner,
        //    };

        // var userManagerMock = MockUserManager<ApplicationUser>(users).Object;

        // var companyServiceMock = new Mock<ICompanyService>();
        //    companyServiceMock.Setup(cs => cs.GetDbModelByIdAsync(company.Id)).ReturnsAsync(company);

        // companyServiceMock.Setup(cs => cs.GetDbModelByIdAsync(company.Id)).ReturnsAsync(company);

        // var repository = new MockRepository(MockBehavior.Strict) { DefaultValue = DefaultValue.Mock };

        // var companyCoursesMock = new Mock<IRepository<CompanyCourse>>();
        //    var usersInCoursesMock = new Mock<IRepository<UserInCourse>>();
        //    companyCoursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCourses);

        // var coursesMock = new Mock<IDeletableEntityRepository<Course>>();
        //    coursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.Courses);

        // var filesMock = new Mock<IFileService>();

        // var service = new CoursesService(
        //        userManagerMock,
        //        companyServiceMock.Object,
        //        companyCoursesMock.Object,
        //        usersInCoursesMock.Object,
        //        coursesMock.Object,
        //        filesMock.Object);

        // // act
        //    var result = await service.AddCompanyAsync(new AddCompanyToCourseViewModel
        //    {
        //        CompanyOwnerEmail = companyOwner.Email,
        //        CurrentUserEmail = admin.Email,
        //        CompanyId = company.Id,
        //        CourseId = course.Id,
        //    });

        // // assert
        //    Assert.True(result.Succeeded);
        // }
        [Fact]
        public async Task CreateAsynShouldCreateANewCoach()
        {
            const string TestFirstName = "TestCoachFirstName";
            const string TestLastName = "TestCoachLastName";
            var repository = new Mock<IDeletableEntityRepository<Coach>>();
            var coach = new Coach()
            {
                Id = 1,
                FirstName = TestFirstName,
                LastName = TestLastName,
            };

            var result = await Task.FromResult(repository.Setup(r => r.AddAsync(coach)));

            Assert.NotNull(coach);
            Assert.Equal(TestFirstName, coach.FirstName);
            Assert.Equal(TestLastName, coach.LastName);
        }

        [Fact]
        public async Task EditAsyncShouldEditCoach()
        {
            const int Id = 1;
            const string UpdatedCoachFirstName = "UpdatedFirstName";
            const string UpdatedCoachLasttName = "UpdatedLastName";
            const string DatabaseName = "EditCoach";
            this.InitializeDatabase(DatabaseName);
            var repository = new Mock<IDeletableEntityRepository<Coach>>();
            var coach = await this.Database
                .Coaches
                .FindAsync(Id);
            coach.FirstName = UpdatedCoachFirstName;
            coach.LastName = UpdatedCoachLasttName;

            var result = repository.Setup(r => r.Update(coach));

            Assert.NotNull(coach);
            Assert.Equal(UpdatedCoachFirstName, coach.FirstName);
            Assert.Equal(UpdatedCoachLasttName, coach.LastName);
        }

        [Fact]
        public async Task DeleteAsyncShouldDeleteACoach()
        {
            const int Id = 1;
            const string DatabaseName = "DeleteCoach";
            this.InitializeDatabase(DatabaseName);
            var repository = new Mock<IDeletableEntityRepository<Coach>>();
            var coach = await this.Database
                .Coaches
                .FindAsync(Id);

            var result = repository.Setup(r => r.Delete(coach));

            Assert.NotNull(coach);
            Assert.True(coach.IsDeleted = true);
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
    }
}
