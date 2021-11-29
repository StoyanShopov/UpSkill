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
           .Calling(c => c.Register(new RegisterRequestModel
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
    }
}
