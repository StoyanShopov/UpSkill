namespace UpSkill.Web.Tests.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using MyTested.AspNetCore.Mvc;

    using Shouldly;

    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Admin.Company;
    using UpSkill.Web.ViewModels.Company;

    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Company;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesControllerTest : TestWithData
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

        [Theory]
        [InlineData(TestCompany)]
        public async Task PostCreateShouldReturnBadRequestWhenTheCompanyAlreadyExist(string name)
        {
            await this.InitializeDatabase(CompanyExist);
            var company = this.Database
                .Companies
                .FirstOrDefault(c => c.Name == name);

            MyController<CompaniesController>
                .Instance(instance => instance
                .WithData(company))
                .Calling(c => c.Create(new CreateCompanyRequestModel
                {
                    Name = name,
                }))
                .ShouldHave()
                .Data(data => data
                .WithSet<Company>(set => set.Contains(company)))
                .AndAlso()
                .ShouldReturn()
                .BadRequest(AlreadyExist);
        }

        [Fact]
        public void PostCreateShouldReturnTheNameIsRequiredWhenInputNameIsNull()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Create(With.Default<CreateCompanyRequestModel>()))
            .ShouldHave()
            .Data(data => data
            .WithSet<Company>(set =>
            {
                set.ShouldNotBeEmpty();
            }))
            .InvalidModelState();

        [Fact]
        public void PutEditShouldBeAllowedOnlyForPutRequest()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Edit(With.Default<UpdateCompanyRequestModel>(), 0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Put));

        [Fact]
        public void PutEditShouldReturnDoesntExistWhenTheinputIdDoesntExistInOurDatabaseInTableCompany()
            => MyController<CompaniesController>
            .Calling(c => c.Edit(
                With.Any<UpdateCompanyRequestModel>(),
                With.Any<int>()))
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(TestCompany, 1)]
        public async Task PutCompanyShouldReturnSuccesfullyEdited(string name, int id)
        {
            await this.InitializeDatabase(CompanyExist);
            var company = this.Database
                .Companies
                .FirstOrDefault(c => c.Id == id);

            MyController<CompaniesController>
                .Instance(instance => instance
                .WithData(company))
                .Calling(c => c.Edit(
                    new UpdateCompanyRequestModel
                    {
                       Name = $"Edit {name}",
                    }, id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                .WithSet<Company>(set =>
                {
                    var company = set.SingleOrDefault(c => c.Id == id);

                    company.ShouldNotBeNull();
                    company.Name.ShouldBe($"Edit {name}");
                }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyEdited);
        }

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
