namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;
    using UpSkill.Web.Areas.Employee.Course;
    using UpSkill.Web.ViewModels.Course;

    using Xunit;

    using static UpSkill.Web.Tests.Comman.TestConstants.EmployeeCoursesConstants;

    public class EmployeeCoursesRouteTest
    {
        [Fact]
        public void GetAllCoursesShouldBeRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestGetAllCourseRouteEmployeeCourses)
           .WithMethod(HttpMethod.Get))
           .To<CoursesController>(c => c.GetAll());

        [Fact]
        public void GetByIdCourseShouldBeRouteCorrectly()
          => MyRouting
          .Configuration()
          .ShouldMap(request => request
          .WithLocation(TestGetByIdCourseRouteEmployeeCourses)
          .WithMethod(HttpMethod.Get))
          .To<CoursesController>(c => c.GetByIdCourse(With.Any<int>()));
    }
}
