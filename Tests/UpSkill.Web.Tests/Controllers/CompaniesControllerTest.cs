namespace UpSkill.Web.Tests.Controllers
{
    using System.Threading.Tasks;

    using MyTested.AspNetCore.Mvc;

    using UpSkill.Web.Areas.Admin.Company;
    using UpSkill.Web.ViewModels.Company;

    using Xunit;

    public class CompaniesControllerTest
    {
        [Fact]
        public void PostCreateShouldBeAllowedOnlyForPostRequestsAndAdminAuthorization()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Create(With.Default<CreateCompanyRequestModel>()).GetAwaiter().GetResult())
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForAuthorizedRequests(withAllowedRoles: "Admin")
            .RestrictingForHttpMethod(HttpMethod.Post));
    }
}
