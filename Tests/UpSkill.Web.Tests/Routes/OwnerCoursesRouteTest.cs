namespace UpSkill.Web.Tests.Routes
{

    using MyTested.AspNetCore.Mvc;
    using UpSkill.Web.Areas.Owner.Course;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    using static Comman.TestConstants.Course;

    public class OwnerCoursesRouteTest
    {
        [Fact]
        public void GetActiveCoursesShouldRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestgetActiveCoursesRoute)
           .WithMethod(HttpMethod.Get))
           .To<CoursesController>(c => c.GetActiveCourses());

        [Fact]
        public void DisableCourseShouldRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestDisableCourseRoute)
           .WithMethod(HttpMethod.Delete))
           .To<CoursesController>(c => c.DisableCourse(With.Any<int>()));

        [Fact]
        public void RequestCourseShouldRouteCorrectly()
       => MyRouting
       .Configuration()
       .ShouldMap(request => request
       .WithLocation(TestRequestCourseRoute)
       .WithMethod(HttpMethod.Post))
       .To<CoursesController>(c => c.RequestCourse(With.Any<RequestCourseViewModel>()));
    }
}
