namespace UpSkill.Web.Tests.Controllers.Owner
{
    using System.Collections.Generic;
    using System.Linq;

    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Web.Areas.Owner.Coach;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Owner;
    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Comman.TestConstants.CompanyOwnerConstants;
    using static Comman.TestConstants.RolesNamesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesControllerTests
    {
        private readonly ApplicationUser user = new ApplicationUser
        {
            UserName =TestOwnerUserName,
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
        public void AddCoachAsyncShouldBeRestrictedForPostMethods(int coachId, string email)
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
        [InlineData(5, "Sasho" , TestOwnerEmail)]
        public void AddCoachAsyncShouldAddCoachToCompanyAndShouldReturnSucceeded(int coachId, string coachFirstName,string email)
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
            .WithData(user)
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
        public void GetAllShouldBeRestrictedForPostMethods()
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
    }
}
