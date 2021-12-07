namespace UpSkill.Web.Tests.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using MyTested.AspNetCore.Mvc;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Employee.Course;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    using static UpSkill.Web.Tests.Comman.TestConstants.EmployeeCoursesConstants;

    public class EmployeeCoursesControllerTest : TestWithData
    {
        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
        {
            this.InitializeDatabase(Database1Name);

            MyController<CoursesController>
           .Instance()
           .WithUser(x => x.WithIdentifier("1"))
           .WithData(this.Database.Users.ToList())
           .Calling(c => c.GetAll())
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Get)
           .SpecifyingRoute(TestGetAllCourseRouteEmployeeCourses));
        }

        [Fact]
        public void GetAllShouldReturnTheCorrectDataWithCorrectModel()
        {
            this.InitializeDatabase(Database2Name);

            MyController<CoursesController>
                .Instance()
                .WithUser(x => x.WithIdentifier("2"))
                .WithData(this.Database.Users.ToList())
                .Calling(c => c.GetAll())
                .ShouldReturn()
                .ResultOfType<IEnumerable<CoursesListingModel>>();
        }

        [Theory]
        [InlineData(1)]
        public void GetByIdShouldReturnCorrectDataWithCorrectModelWhenInputIdIsValid(int id)
        {
            this.InitializeDatabase(Database3Name);

            MyController<CoursesController>
                .Instance()
                .WithUser(x => x.WithIdentifier("2"))
                .WithData(this.Database.Users.ToList())
                .Calling(c => c.GetByIdCourse(id))
                .ShouldReturn()
                .ResultOfType<DetailsViewModel>(result => result
                    .Passing(c => c.Id == id));
        }

        [Theory]
        [InlineData(1)]
        public void GetByIdShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute(int id)
        {
            this.InitializeDatabase(DatabaseName);

            MyController<CoursesController>
                .Instance()
                .WithUser(x => x.WithIdentifier("2"))
                .WithData(this.Database.Users.ToList())
                .Calling(c => c.GetByIdCourse(id))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                    .RestrictingForHttpMethod(HttpMethod.Get)
                    .SpecifyingRoute(TestGetByIdRoute));
        }
    }
}
