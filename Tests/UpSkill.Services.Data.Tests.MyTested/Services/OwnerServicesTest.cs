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

    public class OwnerServicesTest
    {
        private Mock<ICoachServices> coachServiceMock = new Mock<ICoachServices>();
        private Mock<ICurrentUserService> currentUserServiceMock = new Mock<ICurrentUserService>();
        private Mock<IOwnerServices> ownerServicesMock = new Mock<IOwnerServices>();

        [Fact]
        public void AddCoachAsyncShouldAddCoachToCompany()
            => MyController<CoachesController>
            .Instance(instance => instance
            .WithDependencies(
                ownerServicesMock,
                currentUserServiceMock,
                coachServiceMock))
            .Calling(c => c.AddCoachToOwner(
                new AddCoachToCompanyModel
                {
                    CoachId = 2,
                    OwnerEmail = "ownerMotionSoftware@test.test"
                }
                ))
            .ShouldReturn()
            .Ok();
    }
}

