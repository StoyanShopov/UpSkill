namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;
    using UpSkill.Web.Areas.Owner.Employee;
    using UpSkill.Web.ViewModels.Employee;
    using Xunit;

    using static Comman.TestConstants.Employee;

    public class OwnerEmployeesRouteTest
    {
        [Fact]
        public void GetAllShouldRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestGetAllRoute)
           .WithMethod(HttpMethod.Get))
           .To<EmployeeController>(c => c.GetAll());

        [Fact]
        public void GetGetAllEmployeesShouldRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestGetAllCompanyEmployeesRoute)
           .WithMethod(HttpMethod.Get))
           .To<EmployeeController>(c => c.GetAllCompanyEmployees());

        [Fact]
        public void DeleteDeleteEmployeeShouldRouteCorrectly()
           => MyRouting
           .Configuration()
           .ShouldMap(request => request
           .WithLocation(TestDeleteEmployeeRoute)
           .WithMethod(HttpMethod.Delete))
           .To<EmployeeController>(c => c.DeleteAsync(With.Any<string>()));

        [Fact]
        public void PostCreateEmployeeRouteCorrectly()
       => MyRouting
       .Configuration()
       .ShouldMap(request => request
       .WithLocation(TestCreateEmployeeRoute)
       .WithMethod(HttpMethod.Post))
       .To<EmployeeController>(c => c.Create(With.Any<CreateEmployeeViewModel>()));
    }
}
