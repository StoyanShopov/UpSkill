namespace UpSkill.Services.Data.Owner
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.RolesNamesConstants;

    public class OwnersServices : IOwnerServices
    {
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly UserManager<ApplicationUser> userManager;

        public OwnersServices(
            IRepository<CompanyCourse> companyCourses,
            UserManager<ApplicationUser> userManager)
        {
            this.companyCourses = companyCourses;
            this.userManager = userManager;
        }

        public Task<IEnumerable<TModel>> GetAllAsync<TModel>()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId)
        {
            var courses = new List<TModel>();

            var user = await this.GetUserById(userId);

            if (user != null && await this.userManager.IsInRoleAsync(user, CompanyOwnerRoleName))
            {
                courses = await this.companyCourses
                    .AllAsNoTracking()
                    .Where(c => c.CompanyId == user.CompanyId)
                    .To<TModel>()
                    .ToListAsync();

                return courses;
            }

            return courses;
        }

        public async Task<CoursesCountModel> CountCompanyCourses<TModel>(string userId)
        {
            var courses = await this.GetAllCoursesAsync<CoursesListingModel>(userId);
            return new CoursesCountModel { Count = courses.Count() };
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
