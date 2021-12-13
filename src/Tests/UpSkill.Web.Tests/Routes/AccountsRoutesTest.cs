namespace UpSkill.Web.Tests.Routes
{
    using MyTested.AspNetCore.Mvc;

    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Account;

    using Xunit;

    using static Comman.TestConstants.Account;

    public class AccountsRoutesTest
    {
        [Fact]
        public void PostChangePasswordShouldBeRouteCorrectly()
            => MyRouting
            .Configuration()
            .ShouldMap(request => request
            .WithLocation(AccountChangePasswordRoute)
            .WithMethod(HttpMethod.Post))
            .To<AccountController>(c => c.ChangePassword(With.Any<ChangePasswordRequestModel>()));
    }
}
