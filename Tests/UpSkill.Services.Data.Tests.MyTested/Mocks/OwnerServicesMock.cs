using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpSkill.Common;
using UpSkill.Data.Common.Repositories;
using UpSkill.Data.Models;
using UpSkill.Services.Data.Contracts.Coach;
using UpSkill.Services.Data.Contracts.Company;
using UpSkill.Services.Data.Contracts.Owner;
using UpSkill.Services.Data.Owner;
using UpSkill.Services.Messaging;
using UpSkill.Web.ViewModels.Owner;

namespace UpSkill.Services.Data.Tests.MyTested.Mocks
{
    public class OwnerServicesMock
    {
        public static IOwnerServices AddCoachAsyncReturnsTrue(AddCoachToCompanyModel model)
        {           
                var ownerServiceMock = new Mock<IOwnerServices>();
            if (model.OwnerEmail == "ownerMotionSoftware@test.test" && model.CoachId == 4)
            {
                ownerServiceMock.Setup(o => o.AddCoachAsync(model)).ReturnsAsync(true);
            }
            else
            {
                ownerServiceMock.Setup(o => o.AddCoachAsync(model)).ReturnsAsync(false);
            }

            return ownerServiceMock.Object;

        }
        //public OwnerServicesMock(IRepository<CompanyCourse> companyCourses, IRepository<CompanyCoach> companyCoaches, UserManager<ApplicationUser> userManager, ICoachServices coachService, ICompanyService companyService, IEmailSender emailSender) : base(companyCourses, companyCoaches, userManager, coachService, companyService, emailSender)
        //{
        //}

        //public override Task<Result> AddCoachAsync(AddCoachToCompanyModel model)
        //{
        //    if (model.OwnerEmail == "ownerMotionSoftware@test.test" && model.CoachId == 2)
        //    {               
        //        return Task.FromResult(new Result());
        //    }

        //    return Task.FromResult(new Result());
        //}
    }
}
