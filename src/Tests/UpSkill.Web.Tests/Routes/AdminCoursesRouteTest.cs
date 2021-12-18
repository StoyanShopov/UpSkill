namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;
    using UpSkill.Web.Areas.Admin.Course;
    using UpSkill.Web.ViewModels.Course;
    using Xunit;

    using static UpSkill.Web.Tests.Comman.TestConstants.AdminCoursesConstants;

    public class AdminCoursesRouteTest
    {
        [Fact]
        public void PostCreateShouldBeRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestPostCreateRouteAdminCourses)
           .WithMethod(HttpMethod.Post))
           .To<CoursesController>(c => c.Create(With.Any<CreateCourseViewModel>()));

        //[Fact]
        //public void PostAddCompanyShouldBeRouteCorrectly()
        //   => MyRouting
        //   .Configuration()
        //   .ShouldMap(request => request
        //   .WithLocation(TestPostAddCompanyRouteAdminCourses)
        //   .WithMethod(HttpMethod.Post))
        //   .To<CoursesController>(c => c.AddCompany(With.Any<AddCompanyToCourseViewModel>()));

        [Fact]
        public void PutEditShouldBeRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestPutEditRouteShouldAdminCourses)
           .WithMethod(HttpMethod.Put))
           .To<CoursesController>(c => c.Edit(With.Any<EditCourseViewModel>(), With.Any<int>()));

        [Fact]
        public void GetDetailsShouldBeRouteCorrectly()
          => MyRouting
          .Configuration()
          .ShouldMap(request => request
          .WithLocation(TestGetDetailsRouteAdminCourses)
          .WithMethod(HttpMethod.Get))
          .To<CoursesController>(c => c.Details(With.Any<int>()));

        [Fact]
        public void DeleteCoursesShouldBeRouteCorrectly()
          => MyRouting
          .Configuration()
          .ShouldMap(request => request
          .WithLocation(TestDeleteCourseRouteAdminCourses)
          .WithMethod(HttpMethod.Delete))
          .To<CoursesController>(c => c.Delete(With.Any<int>()));

        [Fact]
        public void GetAllCoursesShouldBeRouteCorrectly()
         => MyRouting
         .Configuration()
         .ShouldMap(request => request
         .WithLocation(TestGetAllCourseRouteAdminCourses)
         .WithMethod(HttpMethod.Get))
         .To<CoursesController>(c => c.GetAll());
    }
}
