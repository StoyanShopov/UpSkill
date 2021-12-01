namespace UpSkill.Web.Tests.Controllers.Coach
{
    using System.Collections.Generic;
    using System.Linq;

    using MyTested.AspNetCore.Mvc;

    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Coach;
    using Xunit;

    using static Comman.TestConstants.Coach;

    public class CoachesControllerTest : TestWithData
    {
        [Fact]
        public void GetAllShouldBeAllowedOnlyForGetRequestsAndTheCorrectRoute()
            => MyController<CoachesController>
                .Instance()
                .Calling(c => c.GetAll())
                .ShouldHave()
                .ActionAttributes(attribute => attribute.RestrictingForHttpMethod(HttpMethod.Get)
                    .SpecifyingRoute(GetAllCoaches));

        [Fact]
        public void GetShouldReturnTheCorrectDataWithCorrectModel()
        {
            this.InitializeDatabase(GetAllCoachesExist);

            MyController<CoachesController>
                .Instance()
                .WithData(this.Database.Coaches.ToList())
                .Calling(c => c.GetAll())
                .ShouldReturn()
                .ResultOfType<IEnumerable<CoachListingModel>>();
        }
    }
}
