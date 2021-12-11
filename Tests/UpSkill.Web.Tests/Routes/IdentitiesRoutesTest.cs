namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;

    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Identity;

    using Xunit;

    using static Comman.TestConstants.Identity;

    public class IdentitiesRoutesTest
    {
        [Fact]
        public void PostRegisterShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(PostRegisterRoute)
            .WithMethod(HttpMethod.Post))
            .To<IdentityController>(r => r.Register(With.Any<RegisterRequestModel>()));

        [Fact]
        public void PostLoginShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(PostLoginRoute)
            .WithMethod(HttpMethod.Post))
            .To<IdentityController>(l => l.Login(With.Any<LoginRequestModel>()));

        [Fact]
        public void PostLogoutShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(PostLogoutRoute)
            .WithMethod(HttpMethod.Post))
            .To<IdentityController>(l => l.Logout());

        [Fact]
        public void GetCurrentUserShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(GetCurrentUserRoute)
            .WithMethod(HttpMethod.Get))
            .To<IdentityController>(u => u.GetCurrentUser());
    }
}
