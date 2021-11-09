namespace UpSkill.Services.Data.Contracts.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Employee;

    public interface IEmployeeService
    {
        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<TModel> GetByIdCourseAsync<TModel>(string userId, int courseId);

        Task<IEnumerable<TModel>> GetCompanyEmployeesAsync<TModel>(string userId);
    }
}
