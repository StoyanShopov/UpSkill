namespace UpSkill.Services.Data.Owner
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Company;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    using static UpSkill.Common.GlobalConstants.AccountConstants;
    using static UpSkill.Common.GlobalConstants.ControllersResponseMessages;
    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    public class OwnersServices : IOwnerServices
    {
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly IRepository<CompanyCoaches> companyCoaches;
        private readonly ICoachServices coachService;
        private readonly ICompanyService companyService;
        private readonly UserManager<ApplicationUser> userManager;

        public OwnersServices(
            IRepository<CompanyCourse> companyCourses,
            IRepository<CompanyCoaches> companyCoaches,
            UserManager<ApplicationUser> userManager,
            ICoachServices coachService,
            ICompanyService companyService)
        {
            this.companyCourses = companyCourses;
            this.userManager = userManager;
            this.companyCoaches = companyCoaches;
            this.coachService = coachService;
            this.companyService = companyService;
        }

        public Task<IEnumerable<TModel>> GetAllAsync<TModel>()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId)
        {
            var user = await this.GetUserById(userId);

            var courses = await this.companyCourses
                    .AllAsNoTracking()
                    .Where(c => c.CompanyId == user.CompanyId)
                    .To<TModel>()
                    .ToListAsync();

            return courses;
        }

        public async Task<CoursesCountModel> CountCompanyCourses<TModel>(string userId)
        {
            var courses = await this.GetAllCoursesAsync<CoursesListingModel>(userId);
            return new CoursesCountModel { Count = courses.Count() };
        }

        public async Task<IEnumerable<TModel>> GetAllCoachesAsync<TModel>(string userId)
        {
            var user = await this.GetUserById(userId);

            var courses = await this.companyCoaches
                    .AllAsNoTracking()
                    .Where(c => c.CompanyId == user.CompanyId)
                    .To<TModel>()
                    .ToListAsync();

            return courses;
        }

        public async Task<Result> AddCoachAsync(AddCoachToCompanyModel model)
        {
            var companyOwner = await this.userManager.FindByEmailAsync(model.OwnerEmail);
            var companyOwnerRoles = await this.userManager.GetRolesAsync(companyOwner);

            if (!companyOwnerRoles.Contains(CompanyOwnerRoleName))
            {
                return UserNotInCompanyOwnerRole;
            }

            var coach = await this.coachService.GetByIdAsync<CoachDetailsModel>(model.CoachId);
            if (coach == null)
            {
                return DoesNotExist;
            }

            var company = await this.companyService.GetByIdAsync<CompanyDetailsModel>(companyOwner.CompanyId);
            if (company == null)
            {
                return DoesNotExist;
            }

            var companyCoach = new CompanyCoaches
            {
                CompanyId = companyOwner.CompanyId,
                CoachId = model.CoachId,
            };

            var companyCoachExist = await this.companyCoaches
                .AllAsNoTracking()
                .Where(cc => cc.CoachId == model.CoachId
                && cc.CompanyId == companyOwner.CompanyId)
                .FirstOrDefaultAsync() != null;

            if (companyCoachExist)
            {
                return AlreadyExist;
            }

            await this.companyCoaches.AddAsync(companyCoach);

            await this.companyCoaches.SaveChangesAsync();

            return true;
        }

        public async Task<Result> RemoveCoachAsync(int coachId, string userId)
        {
            var user = await this.GetUserById(userId);

            var coach = await this.coachService.GetByIdAsync<CoachDetailsModel>(coachId);
            if (coach == null)
            {
                return DoesNotExist;
            }

            var company = await this.companyService.GetByIdAsync<CompanyDetailsModel>(user.CompanyId);
            if (company == null)
            {
                return DoesNotExist;
            }

            var companyCoach = await this.companyCoaches
                .AllAsNoTracking()
                .Where(cc => cc.CoachId == coachId
                && cc.CompanyId == user.CompanyId)
                .FirstOrDefaultAsync();

            if (companyCoach == null)
            {
                return DoesNotExist;
            }

            this.companyCoaches.Delete(companyCoach);

            await this.companyCoaches.SaveChangesAsync();

            return true;
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
