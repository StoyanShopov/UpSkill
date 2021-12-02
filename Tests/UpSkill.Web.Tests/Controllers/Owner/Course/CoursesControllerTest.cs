namespace UpSkill.Web.Tests.Controllers.Owner.Course
{
    using System.Collections.Generic;
    using System.Linq;

    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Owner.Coach;
    using UpSkill.Web.Areas.Owner.Course;
    using UpSkill.Web.Areas.Owner.Employee;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;
    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Comman.TestConstants.CompanyOwnerConstants;
    using static Comman.TestConstants.RolesNamesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesControllerTest
    {
        private const int TestCompanyId = 2;
        private const int TestCourseId = 5;

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
        public void GetActiveCoursesShouldReturnResultWithIenumarableOfDetailsViewModel()
        {
            MyController<CoursesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.GetActiveCourses())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(ActiveCourses))
            .AndAlso()
            .ShouldReturn()
            .ResultOfType<IEnumerable<DetailsViewModel>>();
        }

        [Fact]
        public void GetActiveCoursesShouldBeAllowedOnlyForGetMethods()
        {
            MyController<CoursesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.GetActiveCourses())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get));
        }

        [Fact]
        public void DisableCourseShouldBeAllowedOnlyForDeleteMethods()
        {
            MyController<CoursesController>
            .Instance()
            .WithData(this.user)
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DisableCourse(TestCourseId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete));
        }

        [Theory]
        [InlineData(TestCourseId)]
        public void DisableShouldRemoveCourseFromCompanyAndShouldReturnRemovedSuccessfully(int courseId)
        {
            MyController<CoursesController>
            .Instance(instance => instance
            .WithData(
                this.user,
                new Course
                {
                    Id = courseId,
                },
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                },
                new CompanyCourse
                {
                    CourseId = courseId,
                    CompanyId = this.user.CompanyId,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName)))
            .Calling(c => c.DisableCourse(courseId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldHave()
            .Data(data => data
                .WithSet<CompanyCourse>(set =>
                {
                    set.SingleOrDefault(cc => cc.CourseId == courseId && cc.CompanyId == this.user.CompanyId).ShouldBeNull();
                }))
            .AndAlso()
            .ShouldReturn()
            .Ok();
        }

        [Theory]
        [InlineData(TestCourseId)]
        public void DisableCourseShouldReturnBadRequestIfCourseIdProvidedIsNotOfAValidCompanyCourse(int courseId)
        {
            MyController<CoursesController>
            .Instance()
            .WithData(
                this.user,
                new Company
                {
                    Id = this.user.CompanyId,
                    Name = TestCompany,
                })
            .WithUser(u => u.WithNameType(TestOwnerUserName).WithIdentifier(this.user.Id).WithRoleType(CompanyOwnerRoleName))
            .Calling(c => c.DisableCourse(courseId))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Delete))
            .AndAlso()
            .ShouldReturn()
            .BadRequest();
        }

        [Fact]
        public void RequestCourseShouldShouldReturnBadRequestIfCalledWithEmptyModel()
        {
            MyController<CoursesController>
            .Instance()
            .Calling(c => c.RequestCourse(With.Any<RequestCourseViewModel>()))
            .ShouldReturn()
            .BadRequest();
        }

        [Theory]
        [InlineData("SomeDescription", "TestField")]
        public void RequestCourseShouldReturnOkIfAValidModelStateIsPassedAndRequestDidNotThrowException(string description, string category)
        {
            MyController<CoursesController>
            .Instance()
            .Calling(c => c.RequestCourse(new RequestCourseViewModel
            {
                RequesterEmail = this.user.Email,
                RequesterFullName = this.user.FirstName,
                Description = description,
                Category = category,
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
            MyController<CoursesController>
            .Instance()
            .Calling(c => c.RequestCourse(With.Any<RequestCourseViewModel>()))
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Post));
        }
    }
}
