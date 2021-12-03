namespace UpSkill.Web.Tests.Controllers
{
    using System.Linq;
    using System.Security.Claims;

    using Microsoft.AspNetCore.Http;
    using MyTested.AspNetCore.Mvc;

    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Account;

    using Xunit;

    using static Comman.TestConstants.Account;
    using static Comman.TestConstants.Identity;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static UpSkill.Common.GlobalConstants;
    using static UpSkill.Common.GlobalConstants.AccountConstants;

    public class AccountControllerTest : TestWithData
    {
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
                   new Claim(ClaimTypes.NameIdentifier, UserId),
               }, TestAuthentication));

            MyController<AccountController>
                .Instance()
                .WithHttpContext(new DefaultHttpContext { User = user })
                .WithData(this.Database.Users.ToList())
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

        [Fact]
        public void PostChangePasswordShouldShouldReturnBadRequestWhenUserDoesntExist()
        {
            this.InitializeDatabase(AccountChangePasswordBadRequestTheUserDoesntExist);

            var user = new ClaimsPrincipal(new ClaimsIdentity(
               new Claim[]
               {
                   new Claim(ClaimTypes.NameIdentifier, FakeUserId),
               }, TestAuthentication));

            MyController<AccountController>
               .Instance()
               .WithHttpContext(new DefaultHttpContext { User = user })
               .WithData(this.Database.Users.ToList())
               .Calling(a => a.ChangePassword(With.Default<ChangePasswordRequestModel>()))
               .ShouldReturn()
               .BadRequest(Unauthorized);
        }

        [Theory]
        [InlineData(FakeOldPassword, NewPassword, ConfirmNewPassword)]
        public void PostChangePasswordShouldReturnWrongPassword(string oldPassword, string newPassword, string confirmNewPassword)
        {
            this.InitializeDatabase(WrongPassword);

            var user = new ClaimsPrincipal(new ClaimsIdentity(
               new Claim[]
               {
                   new Claim(ClaimTypes.NameIdentifier, UserId),
               }, TestAuthentication));

            MyController<AccountController>
                .Instance()
                .WithHttpContext(new DefaultHttpContext { User = user })
                .WithData(this.Database.Users.ToList())
                .Calling(a => a.ChangePassword(new ChangePasswordRequestModel
                {
                    OldPassword = oldPassword,
                    NewPassword = newPassword,
                    ConfirmNewPassword = confirmNewPassword,
                }))
                .ShouldReturn()
                .BadRequest(WrongOldPassword);
        }

        [Theory]
        [InlineData(OldPassword, NewPassword, FakeConfirmNewPassword)]
        public void PostChangePasswordShouldReturnBadRequestWhenNewPasswordDontMatchWithConfirmNewPassword(string oldPassword, string newPassword, string confirmNewPassword)
        {
            this.InitializeDatabase(FakeConfirmNewPasswordDb);

            var user = new ClaimsPrincipal(new ClaimsIdentity(
               new Claim[]
               {
                   new Claim(ClaimTypes.NameIdentifier, UserId),
               }, TestAuthentication));

            MyController<AccountController>
           .Instance()
           .WithHttpContext(new DefaultHttpContext { User = user })
           .WithData(this.Database.Users.ToList())
           .Calling(a => a.ChangePassword(new ChangePasswordRequestModel
           {
               OldPassword = oldPassword,
               NewPassword = newPassword,
               ConfirmNewPassword = confirmNewPassword,
           }))
           .ShouldReturn()
           .BadRequest(DifferentPasswords);
        }
    }
}
