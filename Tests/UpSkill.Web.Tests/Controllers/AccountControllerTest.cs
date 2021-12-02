namespace UpSkill.Web.Tests.Controllers
{
    using System.Linq;
    using System.Security.Claims;

    using Microsoft.AspNetCore.Http;
    using MyTested.AspNetCore.Mvc;

    using Shouldly;

    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Account;

    using Xunit;

    using static Comman.TestConstants.Account;
    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Identity;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AccountControllerTest : TestWithData
    {
        private static readonly ApplicationRole Role = new ApplicationRole(OwnerRole);
        private readonly ApplicationUser user = InitializeFakeUserWithRoles(Role);

        [Fact]
        public void PostChangePasswordShouldBeAllowedOnlyForPostRequest()
            => MyController<AccountController>
            .Instance()
            .Calling(c => c.ChangePassword(With.Default<ChangePasswordRequestModel>()))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post)
            .SpecifyingRoute(ChangePasswordRoute));

        [Theory]
        [InlineData(OldPassword, NewPassword, ConfirmNewPassword)]
        public void PostChangePasswordShouldChangePassword(string oldPassword, string newPassword, string confirmNewPassword)
        {
            this.InitializeDatabase(AccountChangesPasswordSuccessguly);

            var user = new ClaimsPrincipal(new ClaimsIdentity(
               new Claim[]
               {
                   new Claim(ClaimTypes.Email, TestEmail),
               }, TestAuthentication));

            MyController<AccountController>
                .Instance()
                .WithHttpContext(new DefaultHttpContext { User = user })
                .WithData(this.user)
                .Calling(a => a.ChangePassword(new ChangePasswordRequestModel
                {
                    OldPassword = oldPassword,
                    NewPassword = newPassword,
                    ConfirmNewPassword = confirmNewPassword,
                }))
                .ShouldHave()
                .ValidModelState()
                .AndAlso()
                .ShouldReturn()
                .Ok();
        }
    }
}
