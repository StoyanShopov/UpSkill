namespace UpSkill.Web.Tests.Controllers
{
    using System.Linq;

    using MyTested.AspNetCore.Mvc;

    using Shouldly;

    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Web.Controllers;
    using UpSkill.Web.ViewModels.Identity;

    using Xunit;

    using static Comman.TestConstants.Comman;
    using static Comman.TestConstants.Identity;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class IdentiytControllerTest : TestWithData
    {
        [Fact]
        public void PostRegisterShouldBeAllowedOnlyForPostRequests()
            => MyController<IdentityController>
            .Instance()
            .Calling(r => r.Register(With.Default<RegisterRequestModel>()))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post)
            .AllowingAnonymousRequests()
            .SpecifyingRoute(RegisterRoute));

        [Theory]
        [InlineData(TestFirstName, TestLastName, TestEmail, TestCompanyName, TestPassword, TestConfirmPassword)]
        public void PostRegisterShouldRegisterUserWhenDataIsvalid(string firstName, string lastName, string email, string company, string password, string confirmPassword)
        {
            this.InitializeDatabase(IdentityRegisterDatabaseWithValidInputData);

            MyController<IdentityController>
           .Instance(instance => instance
           .WithData(this.Database.Positions.FirstOrDefault(p => p.Name == OwnerRole)))
           .Calling(r => r.Register(new RegisterRequestModel
           {
               FirstName = firstName,
               LastName = lastName,
               Email = email,
               CompanyName = company,
               Password = password,
               ConfirmPassword = confirmPassword,
           }))
           .ShouldHave()
           .ValidModelState()
           .AndAlso()
           .ShouldHave()
           .Data(data => data
           .WithSet<ApplicationUser>(set =>
           {
               set.ShouldNotBeNull();
               set.SingleOrDefault(u => u.Email == email).ShouldNotBeNull();
           }))
           .AndAlso()
           .ShouldReturn()
           .StatusCode(201);
        }

        [Theory]
        [InlineData(TestFirstName, TestLastName, TestEmail, TestCompanyName, TestPassword, TestConfirmPassword)]
        public void PostRegisterShouldReturnThisEmailAlreadyExist(string firstName, string lastName, string email, string company, string password, string confirmPassword)
        {
            this.InitializeDatabase(IdentityRegisterEmailAlreadyExist);

            MyController<IdentityController>
                .Instance(instance => instance
                .WithData(this.Database.Users.ToList()))
                .Calling(r => r.Register(new RegisterRequestModel
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    CompanyName = company,
                    Password = password,
                    ConfirmPassword = confirmPassword,
                }))
                .ShouldHave()
                .Data(data => data
                .WithSet<ApplicationUser>(set =>
                {
                    set.SingleOrDefault(u => u.Email == email).ShouldNotBeNull();
                }))
                .AndAlso()
                .ShouldReturn()
                .BadRequest(e => e.WithModelStateError());
        }

        [Fact]
        public void PostRegisterShouldReturnTheFieldsIsRequiredWhenSomeFromInputDataIsNull()
            => MyController<IdentityController>
            .Instance()
            .Calling(r => r.Register(With.Default<RegisterRequestModel>()))
            .ShouldHave()
            .Data(data => data
            .WithSet<ApplicationUser>(set =>
            {
                set.SingleOrDefault(u => u.FirstName == null).ShouldBeNull();
                set.SingleOrDefault(u => u.LastName == null).ShouldBeNull();
                set.SingleOrDefault(u => u.Email == null).ShouldBeNull();
            }))
            .InvalidModelState()
            .AndAlso()
            .ShouldReturn()
            .BadRequest(e => e.WithModelStateError());

        [Fact]
        public void PostLoginShouldBeAllowedOnlyForPostRequests()
            => MyController<IdentityController>
            .Instance()
            .Calling(l => l.Login(With.Default<LoginRequestModel>()))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post)
            .AllowingAnonymousRequests()
            .SpecifyingRoute(LoginRoute));

        [Theory]
        [InlineData(TestEmail, TestPassword)]
        public void PostLoginShouldReturnTokenWhenInputDataIsValid(string email, string password)
        {
            this.InitializeDatabase(LoginReturnToken);

            MyController<IdentityController>
                .Instance(instance => instance
                .WithData(this.Database.Users.ToList()))
                .Calling(l => l.Login(new LoginRequestModel
                {
                    Email = email,
                    Password = password,
                }))
                .ShouldHave()
                .Data(data => data
                .WithSet<ApplicationUser>(set =>
                {
                    set.ShouldNotBeNull();
                    set.SingleOrDefault(u => u.Email == email).ShouldNotBeNull();
                }))
                .AndAlso()
                .ShouldReturn()
                .Ok(r => r.WithModelOfType<LoginResponseModel>());
        }

        [Fact]
        public void PostLoginShouldReturnThereIsNoSuchUserWhenDataInputEmailIsInvalid()
            => MyController<IdentityController>
            .Instance()
            .Calling(l => l.Login(With.Default<LoginRequestModel>()))
            .ShouldHave()
            .InvalidModelState()
            .AndAlso()
            .ShouldReturn()
            .BadRequest(e => e.WithModelStateError());

        [Fact]
        public void PostLoginShouldReturnIncorrectPasswordOrEmail()
        {
            this.InitializeDatabase(LoginReturnIncorrectEmailOrPassword);

            MyController<IdentityController>
                .Instance(instance => instance
                .WithData(this.Database.Users.ToList()))
                .Calling(l => l.Login(With.Default<LoginRequestModel>()))
                .ShouldHave()
                .InvalidModelState()
                .AndAlso()
                .ShouldReturn()
                .BadRequest(e => e.WithModelStateError());
        }

        [Fact]
        public void PostLogoutShouldBeAllowedOnlyForPostRequests()
            => MyController<IdentityController>
            .Instance()
            .Calling(l => l.Logout())
            .ShouldHave()
            .ActionAttributes(attributes => attributes
            .RestrictingForHttpMethod(HttpMethod.Post)
            .SpecifyingRoute(LogoutRoute));

        [Fact]
        public void PostLogoutShouldDeleteJWtFromCookies()
            => MyController<IdentityController>
            .Instance()
            .Calling(l => l.Logout())
            .ShouldReturn()
            .Ok(new { Message = SuccessMessage });
    }
}
