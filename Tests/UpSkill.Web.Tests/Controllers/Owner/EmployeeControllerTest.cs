namespace UpSkill.Web.Tests.Controllers.Owner
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Moq;
    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Areas.Owner.Employee;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Employee;
    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.CompanyOwnerConstants;
    using static Comman.TestConstants.Employee;
    using static Comman.TestConstants.RolesNamesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class EmployeeControllerTest
    {
        private const int TestCompanyId = 2;
        private const int TestCoachId = 5;
        private static readonly ApplicationRole Role = new ApplicationRole(CompanyOwnerRoleName);
        private readonly ApplicationUser user = InitializeUser(Role);

        [Fact]
        public void GetAllShouldReturnResultWithIenumarableListingModel()
        {
            var claim = new Claim(CompanyOwnerRoleName, CompanyOwnerRoleName);
            MyController<EmployeeController>
            .Instance()
            .WithData(this.user, Role)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName).WithClaim(claim).WithClaims(new List<Claim> { claim }))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(GetAll))
            .AndAlso()
            .ShouldReturn()
            .ResultOfType<IEnumerable<ListEmployeesViewModel>>();
        }

        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetMethods()
        {
            MyController<EmployeeController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get));
        }

        [Theory]
        [InlineData(TestEmployeeFullName, TestEmployeeEmail, TestEmployeePosition)]
        public void CreateShouldBeAllowedOnlyForPostMethods(string fullName, string email, string positionName)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new Position
            {
                Name = positionName,
            },
            new ApplicationRole()
            {
                Id = "1",
                Name = CompanyEmployeeRoleName,
                NormalizedName = CompanyEmployeeRoleName.ToUpper(),
            })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.Create(new CreateEmployeeViewModel
            {
                FullName = fullName,
                Email = email,
                Position = positionName,
            }))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Post));
        }

        [Theory]
        [InlineData(TestEmployeeFullName, TestEmployeeEmail, TestEmployeePosition)]
        public void CreateShouldAddEmployeeAndShouldReturnOk(string fullName, string email, string positionName)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new Position
            {
                Name = positionName,
            },
            new ApplicationRole()
            {
                Id = "1",
                Name = CompanyEmployeeRoleName,
                NormalizedName = CompanyEmployeeRoleName.ToUpper(),
            })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.Create(new CreateEmployeeViewModel
            {
                FullName = fullName,
                Email = email,
                Position = positionName,
            }))
            .ShouldHave()
            .ValidModelState()
            .AndAlso()
            .ShouldHave()
            .Data(data => data
              .WithSet<ApplicationUser>(set =>
              {
                  set.ShouldNotBeNull();
                  set.SingleOrDefault(u => u.Email == email).ShouldNotBeNull();
              }))
            .AndAlso()
            .ShouldReturn()
            .Ok();
        }

        [Theory]
        [InlineData(TestEmployeeFullName, TestEmployeeEmail, TestEmployeePosition)]
        public void CreateShouldReturnBadRequestIfUserWithTheSameEmailAlreadyExists(string fullName, string email, string positionName)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationUser
            {
                FirstName = fullName,
                Email = email,
            },
            new Position
            {
                Name = positionName,
            },
            new ApplicationRole()
            {
                Id = "1",
                Name = CompanyEmployeeRoleName,
                NormalizedName = CompanyEmployeeRoleName.ToUpper(),
            })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.Create(new CreateEmployeeViewModel
            {
                FullName = fullName,
                Email = email,
                Position = positionName,
            }))
            .ShouldReturn()
            .BadRequest(EmailExists);
        }

        [Theory]
        [InlineData(TestEmployeeInvalidName, TestEmployeeEmail, TestEmployeePosition)]
        public void CreateShouldReturnBadRequestIfTheNamePatternIsWrong(string invalidName, string email, string positionName)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new Position
            {
                Name = positionName,
            },
            new ApplicationRole()
            {
                Id = "1",
                Name = CompanyEmployeeRoleName,
                NormalizedName = CompanyEmployeeRoleName.ToUpper(),
            })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.Create(new CreateEmployeeViewModel
            {
                FullName = invalidName,
                Email = email,
                Position = positionName,
            }))
            .ShouldReturn()
            .BadRequest(WrongEmployeeNamePattern);
        }

        [Fact]
        public void DeleteShouldBeAllowedOnlyForDeleteMethods()
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationRole(CompanyEmployeeRoleName))
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.DeleteAsync(With.Any<string>()))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete));
        }

        [Theory]
        [InlineData("2")]
        public void DeleteShouldReturnBadRequestIfEmployeeDoesNotexist(string employeeId)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationRole(CompanyEmployeeRoleName))
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.DeleteAsync(employeeId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);
        }

        [Theory]
        [InlineData("2", TestEmployeeInvalidName, TestEmployeeEmail, TestEmployeePosition)]
        public void DeleteShouldReturnOkIfTheUserWasSuccessfullyDeleted(string employeeId, string fullName, string email, string positionName)
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationUser
            {
                Id = employeeId,
                FirstName = fullName,
                Email = email,
            },
            new ApplicationRole(CompanyEmployeeRoleName))
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.DeleteAsync(employeeId))
            .ShouldHave()
            .Data(data => data
                .WithSet<ApplicationUser>(set =>
                     set.SingleOrDefault(u => u.Email == email).ShouldBeNull()))
            .AndAlso()
            .ShouldReturn()
            .Ok(EmployeeSuccesfullyDeleted);
        }

        [Fact]
        public void GetCompanyEmployeesShouldBeAllowedOnlyForGetMethods()
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationRole(CompanyEmployeeRoleName))
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.GetAllCompanyEmployees())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get));
        }

        [Fact]
        public void GetCompanyEmployeesShouldReturnIEnumarableOfTheCorrectModel()
        {
            MyController<EmployeeController>
            .Instance(instance => instance
            .WithData(
            this.user,
            new ApplicationRole(CompanyEmployeeRoleName))
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.GetAllCompanyEmployees())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get))
            .AndAlso()
            .ShouldReturn()
            .ResultOfType<IEnumerable<EmployeesListingModel>>(result => result
            .Passing(c => c.Count() == 0));
        }

        private static ApplicationUser InitializeUser(ApplicationRole role)
        {
            var claim = new Claim(CompanyOwnerRoleName, CompanyOwnerRoleName);
            var identityUser = new IdentityUserClaim<string>();
            var identityUserRole = new IdentityUserRole<string>();
            identityUser.InitializeFromClaim(claim);
            identityUserRole.RoleId = role.Id;
            ApplicationUser user = new ApplicationUser
            {
                UserName = TestOwnerUserName,
                NormalizedUserName = TestOwnerUserName.ToUpper(),
                Email = TestOwnerEmail,
                NormalizedEmail = TestOwnerEmail.ToUpper(),
                EmailConfirmed = true,
                FirstName = TestOwnerUserName,
                LastName = TestOwnerUserName,
                CompanyId = TestCompanyId,
                Claims = new List<IdentityUserClaim<string>> { identityUser },
            };

            identityUserRole.UserId = user.Id;
            user.Roles = new List<IdentityUserRole<string>> { identityUserRole };

            return user;
        }
    }
}
