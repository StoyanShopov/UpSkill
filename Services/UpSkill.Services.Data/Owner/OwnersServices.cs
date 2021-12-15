namespace UpSkill.Services.Data.Owner
{
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
    using UpSkill.Services.Messaging;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Company;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    using static UpSkill.Common.GlobalConstants;
    using static UpSkill.Common.GlobalConstants.AccountConstants;
    using static UpSkill.Common.GlobalConstants.ControllersResponseMessages;
    using static UpSkill.Common.GlobalConstants.RequestCoachConstants;
    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;
    using static UpSkill.Common.GlobalConstants.UsersEmailsNames;

    public class OwnersServices : IOwnerServices
    {
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly IRepository<CompanyCoach> companyCoaches;
        private readonly ICoachServices coachService;
        private readonly ICompanyService companyService;
        private readonly IEmailSender emailSender;
        private readonly UserManager<ApplicationUser> userManager;

        public OwnersServices(
            IRepository<CompanyCourse> companyCourses,
            IRepository<CompanyCoach> companyCoaches,
            UserManager<ApplicationUser> userManager,
            ICoachServices coachService,
            ICompanyService companyService,
            IEmailSender emailSender)
        {
            this.companyCourses = companyCourses;
            this.companyCoaches = companyCoaches;
            this.userManager = userManager;
            this.companyCoaches = companyCoaches;
            this.coachService = coachService;
            this.companyService = companyService;
            this.emailSender = emailSender;
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

        public async Task<IEnumerable<TModel>> GetAllCoachesAsync<TModel>(string userId)
        {
            var user = await this.GetUserById(userId);

            var coaches = await this.companyCoaches
                .AllAsNoTracking()
                .Where(c => c.CompanyId == user.CompanyId)
                .To<TModel>()
                .ToListAsync();

            return coaches;
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

            var companyCoach = new CompanyCoach
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

        public async Task RequestCoachAsync(RequestCoachModel model)
        {
            var content = string.Format(
                                        HtmlContent,
                                        model.RequesterEmail,
                                        model.RequesterName,
                                        model.Description,
                                        model.Field,
                                        model.Company,
                                        model.Phone);

            // You can use your own email.
            await this.emailSender.SendEmailAsync(
                                       model.RequesterEmail,
                                       model.RequesterName,
                                       AdministratorEmailName,
                                       NewCoachRequest,
                                       content);
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
