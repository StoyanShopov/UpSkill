using UpSkill.Services.Data.Owner;

using Xunit;
using UpSkill.Web.Areas.Owner.Coach;
using UpSkill.Web.ViewModels.Owner;

using global::MyTested.AspNetCore.Mvc;
using Moq;
using UpSkill.Data.Models;
using UpSkill.Services.Data.Contracts.Coach;
using UpSkill.Web.Infrastructure.Services;
using UpSkill.Services.Data.Contracts.Owner;
using UpSkill.Services.Data.Tests.MyTested.Mocks;
using UpSkill.Web.ViewModels.Coach;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace UpSkill.Services.Data.Tests.MyTested.Services
{
    public class OwnerServicesTest
    {
        ApplicationUser user = new ApplicationUser
        {
            UserName = "ownerMotionSoftware",
            NormalizedUserName = "ownerMotionSoftware".ToUpper(),
            Email = "ownerMotionSoftware@test.test",
            NormalizedEmail = "ownerMotionSoftware@test.test".ToUpper(),
            EmailConfirmed = true,
            FirstName = "ownerMotionSoftware",
            LastName = "ownerMotionSoftware",
            
        };

        [Theory]
        [InlineData(5, "ownerMotionSoftware@test.test")]
        public void AddCoachAsyncShouldBeRestrictedForPostMethods(int coachId, string email)
        =>
            MyController<CoachesController>
            .Instance()
            .WithData(user)
            .WithUser(u => u.WithNameType("ownerMotionSoftware").WithIdentifier(user.Id).WithRoleType("Owner"))
            .Calling(c => c.AddCoachToOwner(new AddCoachToCompanyModel
            {
                CoachId = coachId,
                OwnerEmail = email
            }))
            .ShouldHave()
            .ActionAttributes(attributes => attributes
                       .RestrictingForHttpMethod(HttpMethod.Post));
            
        

        [Fact]
        public  void GetAllShouldReturnResultWithIenumarableListingModel()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(user)
            .WithUser(u => u.WithNameType("ownerMotionSoftware").WithIdentifier(user.Id).WithRoleType("Owner"))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get)
            .SpecifyingRoute("getAll"))
            .AndAlso()
            .ShouldReturn()
            .ResultOfType<IEnumerable<OwnerCoachesListingModel>>();
        }

        [Fact]
        public void GetAllShouldBeRestrictedForPostMethods()
        {
            MyController<CoachesController>
            .Instance()
            .WithData(user)
            .WithUser(u => u.WithNameType("ownerMotionSoftware").WithIdentifier(user.Id).WithRoleType("Owner"))
            .Calling(c => c.GetAll())
            .ShouldHave()
            .ActionAttributes(atributes => atributes
            .RestrictingForHttpMethod(HttpMethod.Get));

        }

    }
}

