namespace UpSkill.Web.Tests.Controllers.Owner
{
    using MyTested.AspNetCore.Mvc;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Owner.Employee;
    using UpSkill.Web.ViewModels.Employee;
    using Xunit;

    public class OwnerEmployeeControllerTest : TestWithData
    {
        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequests()
        {
            MyController<EmployeeController>
                .Instance()
                .Calling(c => c.GetAll())
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                .RestrictingForHttpMethod(HttpMethod.Get));
        }

        [Fact]
        public void CreateShouldBeAllowedOnlyForPostRequests()
        {
            MyController<EmployeeController>
                .Instance()
                .Calling(c => c.Create(With.Default<CreateEmployeeViewModel>()))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                .RestrictingForHttpMethod(HttpMethod.Post));
        }

        [Fact]
        public void DeleteShouldBeAllowedOnlyForDeleteRequests()
           => MyController<EmployeeController>
               .Instance()
               .Calling(c => c.DeleteAsync("pitbull"))
               .ShouldHave()
               .ActionAttributes(attributes => attributes
               .RestrictingForHttpMethod(HttpMethod.Delete));

        [Fact]
        public void GetAllCompanyEmployeesShouldBeAllowedOnlyForGetRequestes()
            => MyController<EmployeeController>
            .Instance()
            .Calling(c => c.GetAllCompanyEmployees())
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Get));

        [Fact]
        public void DeleteShouldReturnSuccessfullyDeleted()
            => MyController<EmployeeController>
            .Instance()
    }
}
