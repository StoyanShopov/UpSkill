namespace UpSkill.Web.Tests.Controllers
{
    using System.Collections.Generic;
    using System.IO;
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
    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class AdminCoursesControllerTest : TestWithData
    {
        private static readonly Mock<IFormFile> FileMock = new Mock<IFormFile>();

        [Theory]
        [InlineData(TestTitle, TestDescription, 10, TestCoachId, TestCategoryId)]
        public void PostCreateShouldBeAllowedOnlyForPostRequests(string title, string description, decimal price, int coachId, int categoryId)
        {
            // Setup mock file using a memory stream
            SetupMockfile();

            MyController<CoursesController>
           .Instance()
           .Calling(c => c.Create(InitializeCreateViewModel(title, description, price, coachId, categoryId)))
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Post));
        }

        [Theory]
        [InlineData(TestTitle, TestDescription, 10, TestCoachId, TestCategoryId)]
        public void PostCreateShouldReturnSuccessfullyWhenDataIsValid(string title, string description, decimal price, int coachId, int categoryId)
        {
            // Setup mock file using a memory stream
            SetupMockfile();

            MyController<CoursesController>
            .Instance()
            .Calling(c => c.Create(InitializeCreateViewModel(title,description, 10, coachId, categoryId)))
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
        public void PutEditShouldBeAllowedOnlyForPutRequest()
            => MyController<CoursesController>
            .Instance()
            .Calling(c => c.Edit(With.Default<EditCourseViewModel>(), 0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Put));

        [Fact]
        public void PutEditShouldReturnDoesntExistWhenTheinputIdDoesntExistInOurDatabaseInTableCompany()
            => MyController<CoursesController>
            .Calling(c => c.Edit(
                With.Any<EditCourseViewModel>(),
                With.Any<int>()))
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(TestContent, 1)]
        public void PutCompanyShouldReturnSuccessfullyEdited(string title, int id)
        {
            // Setup mock file using a memory stream
            SetupMockfile();

            this.InitializeDatabase(PutCompanyExist);

            MyController<CoursesController>
                .Instance(instance => instance
                .WithData(this.Database.Courses.ToList()))
                .Calling(c => c.Edit(
                    new EditCourseViewModel
                    {
                        Title = $"Edit {title}",
                        File = FileMock.Object,
                    }, id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                .WithSet<Course>(set =>
                {
                    set.ShouldNotBeNull();
                    var course = set.SingleOrDefault(c => c.Id == id).ShouldNotBeNull();

                    course.ShouldNotBeNull();
                    course.Title.ShouldBe($"Edit {title}");
                }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyEdited);
        }

        [Fact]
        public void GetShouldBeAllowedOnlyForGetRequests()
        {
            MyController<CoursesController>
           .Instance()
           .Calling(c => c.Details(0))
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Get));
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

        private static void SetupMockfile()
        {
            var content = TestContent;
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(content);
            writer.Flush();
            ms.Position = 0;
            FileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
        }

        private static CreateCourseViewModel InitializeCreateViewModel(string title, string description, decimal price, int coachId, int categoryId)
        {
            return new CreateCourseViewModel
            {
                Title = title,
                Description = description,
                Price = price,
                CoachId = coachId,
                CategoryId = categoryId,
                File = FileMock.Object,
            };
        }
    }
}
