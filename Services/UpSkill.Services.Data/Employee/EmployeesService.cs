namespace UpSkill.Services.Data.Employee
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Services.Mapping;

    public class EmployeesService : IEmployeeService
    {
        private readonly IRepository<CompanyCourse> companyCourses;

        public EmployeesService(IRepository<CompanyCourse> companyCourses)
            => this.companyCourses = companyCourses;

        public async Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(int companyId)
            => await this.companyCourses
            .AllAsNoTracking()
            .Where(c => c.CompanyId == companyId)
            .To<TModel>()
            .ToListAsync();

        public async Task<TModel> GetByIdCourseAsync<TModel>(int companyId, int courseId)
            => await this.companyCourses
            .AllAsNoTracking()
            .Where(c => c.CompanyId == companyId
            && c.CourseId == courseId)
            .To<TModel>()
            .FirstOrDefaultAsync();
    }
}
