namespace UpSkill.Web.Tests.Controllers.Coach
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    using Microsoft.AspNetCore.Http;
    using Moq;
    using MyTested.AspNetCore.Mvc;
    using Shouldly;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Areas.Admin.Coach;
    using UpSkill.Web.ViewModels.Coach;

    using Xunit;

    using static Comman.TestConstants.Coach;
    using static Comman.TestConstants.Comman;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class AdminCoachesControllerTest : TestWithData
    {
        private static readonly Mock<IFormFile> FileMock = new Mock<IFormFile>();

        [Theory]
        [InlineData(CoachFirstName, CoachLastName, 50, TestCalendlyUrl, TestCoachField)]
        public void PostCreateShouldBeAllowedOnlyForPostRequests(string firstName, string lastName, decimal price, string calendlyUrl, string field)
        {
            SetupMockfile();

            MyController<CoachesController>
                .Instance()
                .Calling(c => c.Create(InitializeCreateViewModel(firstName, lastName, price, calendlyUrl, field)))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                    .RestrictingForHttpMethod(HttpMethod.Post));
        }

        [Theory]
        [InlineData(CoachFirstName, CoachLastName, 50, TestCalendlyUrl, TestCoachField)]
        public void PostCreateShouldReturnSuccessfullyWhenDataIsValid(string firstName, string lastName, decimal price,
            string calendlyUrl, string field)
        {
            SetupMockfile();

            MyController<CoachesController>
                .Instance()
                .Calling(c => c.Create(InitializeCreateViewModel(firstName, lastName, 50, calendlyUrl, field)))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                    .WithSet<Coach>(set =>
                    {
                        set.ShouldNotBeNull();
                        set.SingleOrDefault(a =>
                            a.FirstName == firstName && a.LastName == lastName && a.Price == price &&
                            a.CalendlyUrl == calendlyUrl && a.Field == field).ShouldNotBeNull();
                    }))
                .AndAlso()
                .ShouldReturn()
                .StatusCode(201, SuccesfullyCreated);
        }

        [Theory]
        [InlineData(CoachFirstName, CoachLastName)]
        public void PostCreateShouldReturnBadRequestWhenTheCoachAlreadyExist(string firstName, string lastName)
        {
            this.InitializeDatabase(PostCoachExist);

            MyController<CoachesController>
                .Instance(instance => instance
                    .WithData(this.Database.Coaches.FirstOrDefault(c => c.FirstName == firstName && c.LastName == lastName)))
                .Calling(c => c.Create(new CreateCoachRequestModel
                {
                    FirstName = firstName,
                    LastName = lastName,
                }))
                .ShouldHave()
                .Data(data => data
                    .WithSet<Coach>(set =>
                    {
                        set.SingleOrDefault(a =>
                        a.FirstName == firstName && a.LastName == lastName).ShouldNotBeNull();
                    }))
                .AndAlso()
                .ShouldReturn()
                .BadRequest(AlreadyExist);
        }

        [Fact]
        public void PutEditShouldBeAllowedOnlyForPutRequest()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.Edit(With.Default<UpdateCoachRequestMode>(), 0))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                    .RestrictingForHttpMethod(HttpMethod.Put));

        [Fact]
        public void PutEditShouldReturnDoesNotExistWhenTheInputIdDoesNotExistInOurDatabaseInTableCompany()
            => MyController<CoachesController>
                .Calling(c => c.Edit(
                    With.Any<UpdateCoachRequestMode>(),
                    With.Any<int>()))
                .ShouldReturn()
                .BadRequest(DoesNotExist);

        [Theory]
        [InlineData(CoachFirstName, 1)]
        public void PutCompanyShouldReturnSuccessfullyEdited(string firstName, int id)
        {
            SetupMockfile();

            this.InitializeDatabase(PutCoachExist);

            MyController<CoachesController>
                .Instance(instance => instance
                    .WithData(this.Database.Coaches.ToList()))
                .Calling(c => c.Edit(
                    new UpdateCoachRequestMode
                    {
                        FirstName = $"Edit {firstName}",
                        File = FileMock.Object,
                    }, id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                    .WithSet<Coach>(set =>
                    {
                        set.ShouldNotBeNull();
                        var coach = set.SingleOrDefault(c => c.Id == id).ShouldNotBeNull();

                        coach.ShouldNotBeNull();
                        coach.FirstName.ShouldBe($"Edit {firstName}");
                    }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyEdited);
        }

        [Fact]
        public void DeleteShouldReturnDoesNotExistWhenTheInputIdDoesNotExistInOurDatabaseCourseTable()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.Delete(
                    With.Any<int>()))
                .ShouldReturn()
                .BadRequest(DoesNotExist);

        [Fact]
        public void DeleteShouldBeAllowedOnlyForDeleteRequests()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.Delete(0))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                    .RestrictingForHttpMethod(HttpMethod.Delete));

        [Theory]
        [InlineData(1)]
        public void DeleteShouldReturnSuccessfullyDeleted(int id)
        {
            this.InitializeDatabase(DeleteCoachExist);

            MyController<CoachesController>
                .Instance(instance => instance
                    .WithData(this.Database.Coaches.ToList()))
                .Calling(c => c.Delete(id))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                    .WithSet<Coach>(set =>
                    {
                        set.SingleOrDefault(c => c.Id == id).ShouldBeNull();
                    }))
                .AndAlso()
                .ShouldReturn()
                .Ok(SuccesfullyDeleted);
        }

        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.GetAll())
                .ShouldHave()
                .ActionAttributes(attr => attr.RestrictingForHttpMethod(HttpMethod.Get)
                    .SpecifyingRoute(GetAll));

        [Fact]
        public void GetAllShouldReturnTheCorrectDataWithCorrectModel()
        {
            this.InitializeDatabase(GetAllCoachesExist);

            MyController<CoachesController>
                .Instance(instance => instance
                    .WithData(this.Database.Coaches.ToList()))
                .Calling(c => c.GetAll())
                .ShouldReturn()
                .ResultOfType<IEnumerable<CoachListingModel>>();
        }

        [Fact]
        public void GetDetailsByIdShouldBeAllowedForGetRequestsAndTheCorrectRoute()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.GetDetails(0))
                .ShouldHave()
                .ActionAttributes(attributes => attributes
                    .RestrictingForHttpMethod(HttpMethod.Get)
                    .SpecifyingRoute(Details));

        [Theory]
        [InlineData(1)]
        public void GetDetailsShouldReturnCorrectDataWithCorrectModel(int id)
        {
            this.InitializeDatabase(GetDetailsCoaches);

            MyController<CoachesController>
                .Instance(instance => instance
                    .WithData(this.Database.Coaches.ToList()))
                .Calling(c => c.GetDetails(id))
                .ShouldReturn()
                .ResultOfType<CoachDetailsModel>(result => result
                    .Passing(c => c.Id == id));
        }

        private static void SetupMockfile()
        {
            var content = "TestContent";
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(content);
            writer.Flush();
            ms.Position = 0;
            FileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
        }

        private static CreateCoachRequestModel InitializeCreateViewModel(string firstName, string lastName, decimal price, string calendlyUrl, string field)
        {
            return new CreateCoachRequestModel
            {
                FirstName = firstName,
                LastName = lastName,
                Field = field,
                Price = price,
                CalendlyUrl = calendlyUrl,
                File = FileMock.Object,
            };
        }
    }
}
