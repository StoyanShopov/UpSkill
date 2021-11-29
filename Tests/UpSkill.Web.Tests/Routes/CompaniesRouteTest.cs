namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;

    using UpSkill.Web.Areas.Admin.Company;
    using UpSkill.Web.ViewModels.Company;

    using Xunit;

    using static Comman.TestConstants.Company;

    public class CompaniesRouteTest
    {
        [Fact]
        public void PostCreateShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(TestPostRouteCompany)
            .WithMethod(HttpMethod.Post))
            .To<CompaniesController>(c => c.Create(With.Any<CreateCompanyRequestModel>()));

        [Fact]
        public void PutCompanyShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(TestPutRouteCompany)
            .WithMethod(HttpMethod.Put))
            .To<CompaniesController>(c => c.Edit(With.Any<UpdateCompanyRequestModel>(), With.Any<int>()));

        [Fact]
        public void DeleteCompanyShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(TestDeleteRouteCompany)
            .WithMethod(HttpMethod.Delete))
            .To<CompaniesController>(c => c.Delete(With.Any<int>()));

        [Fact]
        public void GetAllShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(TestGetAllRouteCompany)
            .WithMethod(HttpMethod.Get))
            .To<CompaniesController>(c => c.GetAll());

        [Fact]
        public void GetDetailsShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(TestGetDetailsRouteCompany)
            .WithMethod(HttpMethod.Get))
            .To<CompaniesController>(c => c.GetDetails(With.Any<int>()));
    }
}
