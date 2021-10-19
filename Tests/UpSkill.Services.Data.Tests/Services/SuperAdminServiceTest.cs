namespace UpSkill.Services.Data.Tests.Services
{
	using System.Threading.Tasks;

	using UpSkill.Data.Common.Repositories;
	using UpSkill.Data.Models;
	using UpSkill.Services.Data.Tests.Common;
	using Microsoft.AspNetCore.Identity;
	using System.Collections.Generic;

	using Moq;

	using Xunit;
	using UpSkill.Services.Data.Course;
	using static UpSkill.Common.GlobalConstants.RolesNamesConstants;
	using UpSkill.Services.Data.Contracts.Company;
	using UpSkill.Web.ViewModels.Course;

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

			var result = await Task.FromResult(repository.Setup(r => r.AddAsync(company)));

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

		[Fact]
		public async Task AddCompanyAsyncShouldReturnSuccesfullyAddedCompanyToCourse()
		{
			// arange
			const int CourseId = 1;
			const int CompanyId = 1;
			const string CompanyOwnerId = "1";
			const string AdminId = "2";
			const string DatabaseName = "AddCompanyToCourse";
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
			var course = await this.Database
			   .Courses
			   .FindAsync(CourseId);

			var companyCourseExpected = new CompanyCourse
			{
				CompanyId = company.Id,
				CourseId = course.Id
			};

			var users = new List<ApplicationUser>
			{
				admin,
				companyOwner
			};

			var userManagerMock = MockUserManager<ApplicationUser>(users).Object;

			var companyServiceMock = new Mock<ICompanyService>();
			companyServiceMock.Setup(cs => cs.GetDbModelByIdAsync(company.Id)).ReturnsAsync(company);

			companyServiceMock.Setup(cs => cs.GetDbModelByIdAsync(company.Id)).ReturnsAsync(company);

			var repository = new MockRepository(MockBehavior.Strict) { DefaultValue = DefaultValue.Mock };
			
			var companyCoursesMock = new Mock<IRepository<CompanyCourse>>();
			companyCoursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.CompanyCourses);

			var coursesMock = new Mock<IDeletableEntityRepository<Course>>();
			coursesMock.Setup(x => x.AllAsNoTracking()).Returns(this.Database.Courses);


			var service = new CoursesService(
				userManagerMock,
				companyServiceMock.Object,
				companyCoursesMock.Object,
				coursesMock.Object);


			// act
			var result = await service.AddCompanyAsync(new AddCompanyToCourseViewModel
			{
				CompanyOwnerEmail = companyOwner.Email,
				CurrentUserEmail = admin.Email,
				CompanyId = company.Id,
				CourseId = course.Id
			});

			// assert
			Assert.True(result.Succeeded);
		}


		private static Mock<UserManager<TUser>> MockUserManager<TUser>(List<TUser> ls) where TUser : class
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
