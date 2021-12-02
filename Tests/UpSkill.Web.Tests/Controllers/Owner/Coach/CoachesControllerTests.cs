namespace UpSkill.Web.Tests.Controllers.Owner.Coach
{
    using System.Collections.Generic;
    using System.Linq;

    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Owner.Coach;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Owner;
    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Comman.TestConstants.CompanyOwnerConstants;
    using static Comman.TestConstants.RolesNamesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesControllerTests : TestWithData
    {
        private const int TestCompanyId = 2;
        private const int TestCoachId = 5;

        private readonly ApplicationUser user = new ApplicationUser
        {
            UserName = TestOwnerUserName,
            NormalizedUserName = TestOwnerUserName.ToUpper(),
            Email = TestOwnerEmail,
            NormalizedEmail = TestOwnerEmail.ToUpper(),
            EmailConfirmed = true,
            FirstName = TestOwnerUserName,
            LastName = TestOwnerUserName,
            CompanyId = TestCompanyId,
        };

        [Theory]
        [InlineData(5, TestOwnerEmail)]
        public void AddCoachAsyncShouldBeAllowedOnlyForPostMethods(int coachId, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email,
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post));

        [Theory]
        [InlineData(5, "Sasho", TestOwnerEmail)]
        public void AddCoachAsyncShouldAddCoachToCompanyAndShouldReturnSucceeded(int coachId, string coachFirstName, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithData(
                this.user,
                new Coach
                {
                    Id = coachId,
                    FirstName = coachFirstName,
                },
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email,
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post))
            .AndAlso()
            .ShouldHave()
            .Data(data => data
               .WithSet<CompanyCoach>(set =>
               {
                   set.ShouldNotBeNull();
                   set.SingleOrDefault(cc => cc.CoachId == coachId && cc.CompanyId == this.user.CompanyId).ShouldNotBeNull();
               }))
            .AndAlso()
            .ShouldReturn()
            .Ok();

        [Theory]
        [InlineData(5, TestOwnerEmail)]
        public void AddCoachAsyncShouldReturnFailureIfUserEmailIsNotOfAexistingUser(int coachId, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email,
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(5, TestOwnerEmail)]
        public void AddCoachAsyncShouldReturnFailureIfCoachDoesNotExistInDB(int coachId, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email,
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(5, "Christopher", TestOwnerEmail)]
        public void AddCoachAsyncShouldReturnFailureIfCompanyDoesNotExistInDB(int coachId, string coachFirstName, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithData(
                this.user,
                new Coach
                {
                    Id = coachId,
                    FirstName = coachFirstName,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email,
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Fact]
        public void GetAllShouldReturnResultWithIenumarableListingModel()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(GetAll))
            .AndAlso()
            .ShouldReturn()
            .ResultOfType<IEnumerable<OwnerCoachesListingModel>>();
        }

        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetMethods()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get));
        }

        [Fact]
        public void DeleteCoachFromOwnerShouldBeAllowedOnlyForDeleteMethods()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DeleteCoachFromOwner(TestCoachId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete));
        }

        [Fact]
        public void DeleteCoachFromOwnerShouldReturnBadRequestIfWrongIdIsPassedOrTheCoachIsNotAddedToThisCompany()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(
                this.user,
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DeleteCoachFromOwner(TestCoachId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);
        }

        [Theory]
        [InlineData(TestCoachId, "Christopher")]
        public void DeleteCoachFromOwnerShouldRemoveCoachFromCompanyAndShouldReturnRemovedSuccessfully(int coachId, string coachName)
        {
            MyController<CoachesController>
            .Instance(instance => instance
            .WithData(
                this.user,
                new Coach
                {
                    Id = coachId,
                    FirstName = coachName,
                },
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                },
                new CompanyCoach
                {
                    CoachId = coachId,
                    CompanyId = this.user.CompanyId,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.DeleteCoachFromOwner(coachId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldHave()
            .Data(data => data
                .WithSet<CompanyCoach>(set =>
                {
                    set.SingleOrDefault(cc => cc.CoachId == coachId && cc.CompanyId == this.user.CompanyId).ShouldBeNull();
                }))
            .AndAlso()
            .ShouldReturn()
            .Ok(SuccesfullyDeleted);
        }

        [Theory]
        [InlineData(TestCoachId, "TestCoach")]
        public void DeleteCoachFromOwnerShouldReturnBadRequestIfCoachIdProvidedIsNotOfACoachAddedToTheGivenOwnerCompany(int coachId, string coachName)
        {
            MyController<CoachesController>
            .Instance()
            .WithData(
                this.user,
                new Coach
                {
                    Id = coachId,
                    FirstName = coachName,
                },
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                },
                new CompanyCoach
                {
                    CoachId = 2,
                    CompanyId = this.user.CompanyId,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DeleteCoachFromOwner(coachId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);
        }

        [Theory]
        [InlineData(TestCoachId)]
        public void DeleteCoachFromOwnerShouldReturnBadRequestIfCoachIdProvidedIsNotOfAValidCoach(int coachId)
        {
            MyController<CoachesController>
            .Instance()
            .WithData(
                this.user,
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                },
                new CompanyCoach
                {
                    CoachId = coachId,
                    CompanyId = this.user.CompanyId,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DeleteCoachFromOwner(coachId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldReturn()
            .BadRequest(DoesNotExist);
        }

        [Fact]
        public void RequestCoachShouldShouldHaveInvalidModelStateIfCalledWithModelStateWithInvalidRequesterName()
        {
            MyController<CoachesController>
            .Instance()
            .Calling(c => c.RequestCoach(With.Default<RequestCoachModel>()))
            .ShouldHave()
            .InvalidModelState();
        }

        [Fact]
        public void RequestCoachShouldShouldReturnBadRequestIfCalledWithEmptyModel()
        {
            MyController<CoachesController>
            .Instance()
            .Calling(c => c.RequestCoach(With.Any<RequestCoachModel>()))
            .ShouldReturn()
            .BadRequest();
        }

        [Theory]
        [InlineData("SomeDescription", "TestField")]
        public void RequestCoachShouldReturnOkIfAValidModelStateIsPassedAndRequestDidNotThrowException(string description, string field)
        {
            MyController<CoachesController>
            .Instance()
            .Calling(c => c.RequestCoach(new RequestCoachModel
            {
                RequesterEmail = this.user.Email,
                RequesterName = this.user.FirstName,
                Description = description,
                Field = field,
            }))
            .ShouldHave()
            .ValidModelState()
            .AndAlso()
            .ShouldReturn()
            .Ok();
        }

        [Fact]
        public void RequestCoachShouldBeAllowedOnlyForPostMethod()
        {
            MyController<CoachesController>
            .Instance()
            .Calling(c => c.RequestCoach(With.Any<RequestCoachModel>()))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Post));
        }
    }
}
