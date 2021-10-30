using UpSkill.Web.ViewModels.Employee;

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
        private readonly IRepository<ApplicationUser> users;
        private readonly UserManager<ApplicationUser> userManager;

        public EmployeesService(
            IRepository<CompanyCourse> companyCourses,
            IRepository<ApplicationUser> users,
            UserManager<ApplicationUser> userManager)
        {
            this.companyCourses = companyCourses;
            this.users = users;
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

        public async Task<IEnumerable<TModel>> GetCompanyEmployeesAsync<TModel>(string userId)
        {
            var user = await this.GetUserById(userId);

            var employees = await this.users
                .AllAsNoTracking()
                .Where(c => c.ManagerId == user.Id)
                .To<TModel>()
                .ToListAsync();

            return employees;
        }

        public async Task<string> CountCompanyEmployees(string userId)
        {
            var employees = await this.GetCompanyEmployeesAsync<EmployeesListingModel>(userId);
            return employees.Count().ToString();
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
