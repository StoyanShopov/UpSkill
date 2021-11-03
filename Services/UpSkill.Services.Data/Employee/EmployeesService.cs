namespace UpSkill.Services.Data.Employee
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
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllersResponseMessages;
    using static Common.GlobalConstants.EmployeeConstants;
    using static Common.GlobalConstants.RolesNamesConstants;

    public class EmployeesService : IEmployeesService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> users;
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IDeletableEntityRepository<Position> positions;
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly UserManager<ApplicationUser> userManager;

        public EmployeesService(
            IDeletableEntityRepository<ApplicationUser> users,
            IDeletableEntityRepository<Company> companies,
            IDeletableEntityRepository<Position> positions,
            IRepository<CompanyCourse> companyCourses,
            UserManager<ApplicationUser> userManager)
        {
            this.users = users;
            this.companies = companies;
            this.companyCourses = companyCourses;
            this.userManager = userManager;
            this.positions = positions;
        }

        public async Task<Result> CreateAsync(CreateEmployeeViewModel model, string userId,string newEmployeePassword)
        {
            var employee = await this.users
                         .All()
                         .Where(e => e.Email == model.Email)
                         .FirstOrDefaultAsync();

            if (employee != null)
            {
                return EmailExists;
            }

            var employeeFullName = model.FullName.Split(" ", 2, StringSplitOptions.RemoveEmptyEntries).ToList();

            var employeeFirstName = employeeFullName[0];
            var employeeLastName = employeeFullName[1];

            if (string.IsNullOrEmpty(employeeFirstName) || string.IsNullOrEmpty(employeeLastName))
            {
                return WrongEmployeeNamePattern;
            }

            var manager = await this.userManager.FindByIdAsync(userId);

            var position = await this.positions.AllAsNoTracking().Where(p => p.Name == model.Position)
                .FirstOrDefaultAsync();

            var newEmployee = new ApplicationUser()
            {
                FirstName = employeeFirstName,
                LastName = employeeLastName,
                Email = model.Email,
                CompanyId = manager.CompanyId,
                PositionId = position.Id,
            };

            // TODO we have to use "userManager" instead of "users" here and set default password
            await this.userManager.CreateAsync(newEmployee,newEmployeePassword);
            await this.userManager.AddToRoleAsync(newEmployee, "Employee");
            await this.users.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(string email)
        {
            var employee = await this.users.AllAsNoTracking().Where(e => e.Email == email).FirstOrDefaultAsync();
            if (employee == null)
            {
                return DoesNotExist;
            }

            this.users.Delete(employee);
            await this.users.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<TModel>> GetAllAsync<TModel>(string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var roles = await this.userManager.GetRolesAsync(user);

            if (user == null || !roles.Contains("Owner"))
            {
                return null;
            }

            return await this.companies
                .All()
                .Where(x => x.Id == user.CompanyId)
                .SelectMany(x => x.Users)
                .Where(u => u.Id != userId)
                .To<TModel>()
                .ToListAsync();
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
