namespace UpSkill.Services.Data.Tests.MyTested.Services
{
    using UpSkill.Services.Data.Owner;

    using Xunit;
    using UpSkill.Web.Areas.Owner.Coach;
    using UpSkill.Web.ViewModels.Owner;

    using static Common.GlobalConstants.ControllersResponseMessages;
    using global::MyTested.WebApi;
    using global::MyTested.AspNetCore.Mvc;
    using Moq;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Data.Tests.MyTested.Mocks;

    public class OwnerServicesTest
    {
        //private OwnerServicesMock ownerServicesMock = new OwnerServicesMock();
        private ICurrentUserService currentUserServiceMock = new Mock<ICurrentUserService>().Object;
        private ICoachServices coachesServiceMock = new Mock<ICoachServices>().Object;
        private Mock<IOwnerServices> ownerServiceMock = new Mock<IOwnerServices>();
        [Fact]
        public void AddCoachAsyncShouldAddCoachToCompany()
        {
            ownerServiceMock.Setup(o => o.AddCoachAsync(new AddCoachToCompanyModel
            {
                CoachId = 4,
                OwnerEmail = "ownerMotionSoftware@test.test"
            })).ReturnsAsync(true);

            MyController<CoachesController>
            .Instance(instance => instance
            .WithDependencies(
              ownerServiceMock.Object,
               currentUserServiceMock,
               coachesServiceMock
               ))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = 4,
                OwnerEmail = "ownerMotionSoftware@test.test"
            }))
            .ShouldReturn()
            .Ok();
        }
    }
}

