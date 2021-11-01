namespace UpSkill.Services.Data.Employee
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Services.Mapping;

    public class EmployeesService : IEmployeeService
    {
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly UserManager<ApplicationUser> userManager;

        public EmployeesService(
            IRepository<CompanyCourse> companyCourses,
            UserManager<ApplicationUser> userManager)
        {
            this.companyCourses = companyCourses;
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

        public async Task<TModel> GetByIdCourseAsync<TModel>(string userId, int courseId)
        {
            var user = await this.GetUserById(userId);

            var course = await this.companyCourses
            .AllAsNoTracking()
            .Where(c => c.CompanyId == user.CompanyId
            && c.CourseId == courseId)
            .To<TModel>()
            .FirstOrDefaultAsync();

            return course;
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
