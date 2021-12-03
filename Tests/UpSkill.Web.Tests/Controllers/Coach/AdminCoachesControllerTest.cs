namespace UpSkill.Web.Tests.Controllers.Coach
{
    using System.Collections.Generic;
    //using System.IO;
    using System.Linq;

    using Microsoft.AspNetCore.Mvc;

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
        [Fact]
        public void PostCreateShouldBeAllowedOnlyForPostRequests()
            => MyController<CoachesController>
                .Instance()
                .WithData(
                    new Coach { File = new File() { FilePath = "File Path" } })
                .Calling(c => c.Create(With.Default<CreateCoachRequestModel>()))
                .ShouldHave()
                .ActionAttributes(attr => attr.RestrictingForHttpMethod(HttpMethod.Post));


        [Theory]
        [InlineData(CoachFirstName, CoachLastName)]
        public void PostCreateShouldReturnSuccessfullyWhenDataIsValid1(string firstName, string lastName)
            => MyController<CoachesController>
                .Instance()
                .WithData(
                    new Coach { File = new File() { FilePath = "File Path" }, FirstName = firstName, LastName = lastName })
                .Calling(c => c.Create(new CreateCoachRequestModel
                {
                    FirstName = firstName,
                    LastName = lastName,
                }))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldHave()
                .Data(data => data
                    .WithSet<Coach>(set =>
                    {
                        set.ShouldNotBeNull();
                        set.SingleOrDefault(a => a.FirstName == firstName && a.LastName == lastName).ShouldNotBeNull();
                    }))
                .AndAlso()
                .ShouldReturn()
                .StatusCode(201, SuccesfullyCreated);



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



        //[Theory]
        //[InlineData(TestCoach)]
        //public void PostCreateShouldReturnSuccessfullyWhenDataIsValid(string name)
        //{
        //    // Setup mock file using a memory stream
        //    SetupMockfile();

        //    MyController<CoachesController>
        //        .Instance()
        //        .Calling(c => c.Create(CreateCoachRequestModel(name)))
        //        .ShouldHave()
        //        .ValidModelState()
        //        .AndAlso()
        //        .ShouldHave()
        //        .Data(data => data
        //            .WithSet<Course>(set =>
        //            {
        //                set.ShouldNotBeNull();
        //                set.SingleOrDefault(c => c.Title == title && c.Description == description
        //                                                          && c.Price == price && c.CoachId == coachId && c.CategoryId == categoryId).ShouldNotBeNull();
        //            }))
        //        .AndAlso()
        //        .ShouldReturn()
        //        .Ok();
        //}

        //private static void SetupMockfile()
        //{
        //    var content = "TestContent";
        //    var ms = new MemoryStream();
        //    var writer = new StreamWriter(ms);
        //    writer.Write(content);
        //    writer.Flush();
        //    ms.Position = 0;
        //    FileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
        //}


    }
}
