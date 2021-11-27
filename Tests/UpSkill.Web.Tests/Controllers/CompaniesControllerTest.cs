namespace UpSkill.Web.Tests.Controllers
{
    using System.Linq;

    using MyTested.AspNetCore.Mvc;

    using UpSkill.Data.Models;
    using UpSkill.Web.Areas.Admin.Company;
    using UpSkill.Web.ViewModels.Company;

    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesControllerTest
    {
        [Fact]
        public void PostCreateShouldBeAllowedOnlyForPostRequests()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Create(With.Default<CreateCompanyRequestModel>()))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post));

        [Theory]
        [InlineData(TestCompany)]
        public void PostCreateShouldReturnSuccesfullyWhenDataIsValid(string name)
            => MyController<CompaniesController>
            .Calling(c => c.Create(new CreateCompanyRequestModel
            {
                Name = name,
            }))
            .ShouldHave()
            .ValidModelState()
            .AndAlso()
            .ShouldHave()
            .Data(data => data
               .WithSet<Company>(set =>
               {
                   set.SingleOrDefault(a => a.Name == name);
               }))
            .AndAlso()
            .ShouldReturn()
            .StatusCode(201, SuccesfullyCreated);

        [Fact]
        public void EditPutShouldBeAllowedOnlyForPutRequest()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Edit(With.Default<UpdateCompanyRequestModel>(), 0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Put));

        [Fact]
        public void DeleteShouldBeAllowedOnlyForDeleteRequests()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Delete(0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Delete));

        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(GetAll));

        [Fact]
        public void GetDetailsByIdShoulBeAllowedForGetRequestsAndTheCorrectRoute()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.GetDetails(0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(Details));
    }
}
