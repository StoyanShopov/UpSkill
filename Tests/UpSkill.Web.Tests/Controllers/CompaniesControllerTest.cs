namespace UpSkill.Web.Tests.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

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
        public void PostCreateShouldReturnSuccessfullyWhenDataIsValid(string name)
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
                   set.ShouldNotBeNull();
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
            var company = await this.Database
                .Companies
                .FirstOrDefaultAsync(c => c.Name == name);

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
        public async Task PutCompanyShouldReturnSuccessfullyEdited(string name, int id)
        {
            await this.InitializeDatabase(CompanyExist);
            var company = await this.Database
                .Companies
                .FirstOrDefaultAsync(c => c.Id == id);

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
                    set.ShouldNotBeNull();
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
        public void DeleteShouldReturnDoesntExistWhenTheInputIdDoesntExistInOurDatabaseTableCompany()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.Delete(
                With.Any<int>()))
            .ShouldReturn()
            .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(1)]
        public async Task DeleteShouldReturnSuccessfulyDeleted(int id)
        {
            await this.InitializeDatabase(CompanyExist);
            var company = await this.Database
                .Companies
                .FirstOrDefaultAsync(c => c.Id == id);

            MyController<CompaniesController>
                .Instance(instance => instance
                .WithData(company))
                .Calling(c => c.Delete(id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                .WithSet<Company>(set =>
                {
                    set.ShouldNotBeNull();
                    set.SingleOrDefault(c => c.Id == id);
                }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyDeleted);
        }

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
        public async Task GetShouldReturnTheCorrectDataWithCorrectModel()
        {
            await this.InitializeDatabase(CompanyExist);
            var companies = await this.Database
                .Companies
                .ToListAsync();

            MyController<CompaniesController>
               .Instance(instance => instance
               .WithData(companies))
               .Calling(c => c.GetAll())
               .ShouldReturn()
               .ResultOfType<IEnumerable<CompanyListingModel>>();
        }

        [Fact]
        public void GetDetailsByIdShoulBeAllowedForGetRequestsAndTheCorrectRoute()
            => MyController<CompaniesController>
            .Instance()
            .Calling(c => c.GetDetails(0))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute(Details));

        [Theory]
        [InlineData(1)]
        public async Task GetDetailsShouldReturnCorrectDataWithCorrectModelWhenInputIdIsValid(int id)
        {
            await this.InitializeDatabase(CompanyExist);
            var company = await this.Database
                .Companies
                .FirstOrDefaultAsync(c => c.Id == id);

            MyController<CompaniesController>
                .Instance(instance => instance
                .WithData(company))
                .Calling(c => c.GetDetails(company.Id))
                .ShouldReturn()
                .ResultOfType<CompanyDetailsModel>(result => result
                .Passing(c => c.Id == company.Id));
        }
    }
}
