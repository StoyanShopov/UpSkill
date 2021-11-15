namespace UpSkill.Services.Data.Owner
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Mapping;

    public class OwnersServices : IOwnerServices
    {
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly IRepository<CompanyCoach> companyCoaches;
        private readonly UserManager<ApplicationUser> userManager;

        public OwnersServices(
            IRepository<CompanyCourse> companyCourses,
            IRepository<CompanyCoach> companyCoaches,
            UserManager<ApplicationUser> userManager)
        {
            this.companyCourses = companyCourses;
            this.companyCoaches = companyCoaches;
            this.userManager = userManager;
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

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
