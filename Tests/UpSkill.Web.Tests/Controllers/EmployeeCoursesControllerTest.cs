namespace UpSkill.Web.Tests.Controllers
{
    using MyTested.AspNetCore.Mvc;
    using System.Linq;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Employee.Course;

    using Xunit;

    using static UpSkill.Web.Tests.Comman.TestConstants.EmployeeCoursesConstants;

    public class EmployeeCoursesControllerTest : TestWithData
    {
        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
        {
            this.InitializeDatabase(DatabaseName);

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
    }
}
