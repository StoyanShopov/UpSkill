namespace UpSkill.Web.Tests.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.AspNetCore.Http;
    using Moq;
    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Admin.Course;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    using static Comman.TestConstants.AdminCoursesConstants;
    using static Comman.TestConstants.AdministratorConstants;
    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class AdminCoursesControllerTest : TestWithData
    {
        private static readonly Mock<IFormFile> Testfile = new Mock<IFormFile>();

        private readonly ApplicationUser user = new ApplicationUser
        {
            UserName = AdministratorUserName,
            NormalizedUserName = AdministratorUserName.ToUpper(),
            Email = AdministratorEmail,
            NormalizedEmail = AdministratorEmail.ToUpper(),
            EmailConfirmed = true,
            FirstName = AdministratorUserName,
            LastName = AdministratorUserName,
            CompanyId = TestCompanyId,
        };

        [Fact]
        public void PostCreateShouldBeAllowedOnlyForPostRequests()
            => MyController<CoursesController>
            .Instance()
            .Calling(c => c.Create(With.Default<CreateCourseViewModel>()))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post));

        [Theory]
        [InlineData(TestTitle, TestDescription, 10, TestCoachId, TestCategoryId)]
        public void PostCreateShouldReturnSuccessfullyWhenDataIsValid(string title, string description, decimal price, int coachId, int categoryId)
        {
            MyController<CoursesController>
            .Instance()
            .Calling(c => c.Create(new CreateCourseViewModel
            {
                Title = title,
                Description = description,
                Price = price,
                CoachId = coachId,
                CategoryId = categoryId,
            }))
            .ShouldHave()
            .ValidModelState()
            .AndAlso()
            .ShouldHave()
            .Data(data => data
               .WithSet<Course>(set =>
               {
                   set.ShouldNotBeNull();
                   set.SingleOrDefault(c => c.Title == title && c.Description == description
                   && c.Price == price && c.CoachId == coachId && c.CategoryId == categoryId).ShouldNotBeNull();
               }))
            .AndAlso()
            .ShouldReturn()
            .Ok();
        }

        [Theory]
        [InlineData(TestTitle, TestDescription, 10, TestCoachId, TestCategoryId)]
        public void PostCreateShouldReturnBadRequestWhenTheCourseAlreadyExist(string title, string description, decimal price, int coachId, int categoryId)
        {
            this.InitializeDatabase(PostCourseExist);

            MyController<CoursesController>
                .Instance(instance => instance
                .WithData(this.Database.Courses.ToList()))
                .Calling(c => c.Create(new CreateCourseViewModel
                {
                    Title = title,
                    Description = description,
                    Price = price,
                    CoachId = coachId,
                    CategoryId = categoryId,
                }))
                .ShouldHave()
                .Data(data => data
                  .WithSet<Course>(set =>
                  {
                      set.SingleOrDefault(a => a.Title == title).ShouldNotBeNull();
                  }))
                .AndAlso()
                .ShouldReturn()
                .BadRequest(AlreadyExist);
        }

        [Fact]
        public void GetDetailsByIdShoulBeAllowedForGetRequestsAndTheCorrectRoute()
           => MyController<CoursesController>
           .Instance()
           .Calling(c => c.Details(0))
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Get)
           .SpecifyingRoute(Details));

        [Theory]
        [InlineData(1)]
        public void DetailsShouldReturnCorrectDataWithCorrectModelWhenInputIdIsValid(int id)
        {
            this.InitializeDatabase(DetailsCourseExist);

            MyController<CoursesController>
                .Instance(instance => instance
                .WithData(this.Database.Courses.ToList()))
                .Calling(c => c.Details(id))
                .ShouldReturn()
                .ResultOfType<DetailsViewModel>(result => result
                .Passing(c => c.Id == id));
        }

        [Fact]
        public void DeleteShouldBeAllowedOnlyForDeleteRequests()
            => MyController<CoursesController>
            .Instance()
            .Calling(c => c.Delete(0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Delete));

        [Fact]
        public void DeleteShouldReturnDoesntExistWhenTheInputIdDoesntExistInOurDatabaseCourseTable()
           => MyController<CoursesController>
           .Instance()
           .Calling(c => c.Delete(
               With.Any<int>()))
           .ShouldReturn()
           .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(1)]
        public void DeleteShouldReturnSuccessfulyDeleted(int id)
        {
            this.InitializeDatabase(DeleteCourseExist);

            MyController<CoursesController>
                .Instance(instance => instance
                .WithData(this.Database.Courses.ToList()))
                .Calling(c => c.Delete(id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                .WithSet<Course>(set =>
                {
                    set.SingleOrDefault(c => c.Id == id).ShouldBeNull();
                }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyDeleted);
        }

        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
           => MyController<CoursesController>
           .Instance()
           .Calling(c => c.GetAll())
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Get)
           .SpecifyingRoute(GetAll));

        [Fact]
        public void GetAllShouldReturnTheCorrectDataWithCorrectModel()
        {
            this.InitializeDatabase(GetAllCourseExist);

            MyController<CoursesController>
               .Instance(instance => instance
               .WithData(this.Database.Courses.ToList()))
               .Calling(c => c.GetAll())
               .ShouldReturn()
               .ResultOfType<IEnumerable<DetailsViewModel>>();
        }
    }
}
