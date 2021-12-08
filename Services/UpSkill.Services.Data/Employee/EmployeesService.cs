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

    public class EmployeesService : IEmployeeService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> users;
        private readonly IDeletableEntityRepository<UserProfile> userProfiles;
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IDeletableEntityRepository<Position> positions;
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly UserManager<ApplicationUser> userManager;

        public EmployeesService(
            IDeletableEntityRepository<ApplicationUser> users,
            IDeletableEntityRepository<UserProfile> userProfiles,
            IDeletableEntityRepository<Company> companies,
            IDeletableEntityRepository<Position> positions,
            IRepository<CompanyCourse> companyCourses,
            UserManager<ApplicationUser> userManager)
        {
            this.users = users;
            this.userProfiles = userProfiles;
            this.companies = companies;
            this.companyCourses = companyCourses;
            this.companies = companies;
            this.userManager = userManager;
            this.positions = positions;
        }

        public async Task<Result> CreateAsync(CreateEmployeeViewModel model, string userId, string newEmployeePassword)
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

            if (employeeFullName.Count != 2)
            {
                return WrongEmployeeNamePattern;
            }

            var employeeFirstName = employeeFullName[0];
            var employeeLastName = employeeFullName[1];

            if (string.IsNullOrEmpty(employeeFirstName) || string.IsNullOrEmpty(employeeLastName))
            {
                return WrongEmployeeNamePattern;
            }

            var user = await this.userManager.FindByIdAsync(userId);

            var position = await this.positions.AllAsNoTracking()
             .Where(p => p.Name == model.Position)
             .FirstOrDefaultAsync();

            var newEmployee = new ApplicationUser()
            {
                FirstName = employeeFirstName,
                LastName = employeeLastName,
                Email = model.Email,
                UserName = model.Email,
                CompanyId = user.CompanyId,
                PositionId = position.Id,
            };

            await this.userManager.CreateAsync(newEmployee, newEmployeePassword);
            await this.userManager.AddToRoleAsync(newEmployee, CompanyEmployeeRoleName);

            return true;
        }

        public async Task<Result> DeleteAsync(string id)
        {
            var employee = await this.users.All()
             .Where(e => e.Id == id)
              .FirstOrDefaultAsync();
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

        public async Task<IEnumerable<TModel>> GetCompanyEmployeesAsync<TModel>(string userId)
        {
            var user = await this.GetUserById(userId);

            return await this.companies
                .AllAsNoTracking()
                .Where(x => x.Id == user.CompanyId)
                .SelectMany(x => x.Users)
                .Where(u => u.Id != userId)
                .To<TModel>()
                .ToListAsync();
        }

        public async Task<TModel> GetEmployeeInfo<TModel>(string userId)
        {
            return await this.users
                .AllAsNoTracking()
                .Include(x => x.Company)
                .Where(u => u.Id == userId)
                .To<TModel>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> EditAsync(UpdateEmployeeRequestModel model, string userId)
        {
            var user = await this.users
                .All()
                .Where(c => c.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return DoesNotExist;
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;

            var userProfile = await this.userProfiles
                .All()
                .Where(x => x.ApplicationUserId == userId)
                .FirstOrDefaultAsync();

            //var file = await this.fileService.EditAsync(user.FileId, model.File);

            userProfile.ProfileSummary = model.Description;
            //userProfile.PhotoFilePath = file;

            await this.users.SaveChangesAsync();

            return true;
        }

        private async Task<ApplicationUser> GetUserById(string userId)
            => await this.userManager.FindByIdAsync(userId);
    }
}
