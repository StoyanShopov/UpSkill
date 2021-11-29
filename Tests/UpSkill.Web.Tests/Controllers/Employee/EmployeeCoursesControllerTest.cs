namespace UpSkill.Web.Tests.Controllers.Employee
{
    using MyTested.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Linq;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Employee.Course;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    public class EmployeeCoursesControllerTest : TestWithData
    {
        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequests()
        => MyController<CoursesController>
           .Instance()
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Get));

        [Fact]
        public void GetByIdShouldBeAllowedOnlyForGetRequests()
       => MyController<CoursesController>
          .Instance()
           .Calling(c => c.GetByIdCourse(1))
           .ShouldHave()
           .ActionAttributes(attributes => attributes
           .RestrictingForHttpMethod(HttpMethod.Get));

        [Theory]
        [InlineData(1)]
        public void GetByIdShouldReturnCorrectDataWithValidModel(int id)
        {
            this.InitializeDatabase("test");

            MyController<CoursesController>
            .Instance()
            .WithData(this.Database.Courses.ToList())
            .Calling(c => c.GetByIdCourse(id))
            .ShouldReturn()
            .ResultOfType<DetailsViewModel>(result => result
            .Passing(r => r.Id == id));
        }

        [Fact]
        public void GetAllShouldReturnCorrectDataWithValidModel()
        {
            this.InitializeDatabase("test");

            MyController<CoursesController>
              .Instance()
              .WithData(this.Database.Courses.ToList())
              .Calling(c => c.GetAll())
              .ShouldReturn()
              .ResultOfType<IEnumerable<CoursesListingModel>>();
        }
    }
}
