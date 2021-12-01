namespace UpSkill.Web.Tests.Controllers.Coach
{
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
                .Calling(c => c.Create(With.Default<CreateCoachRequestModel>()))
                .ShouldHave()
                .ActionAttributes(attr => attr.RestrictingForHttpMethod(HttpMethod.Post));

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
    }
}
