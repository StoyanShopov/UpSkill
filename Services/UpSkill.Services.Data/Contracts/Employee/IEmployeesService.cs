namespace UpSkill.Services.Data.Contracts.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Employee;

    public interface IEmployeesService
    {
        Task<Result> CreateAsync(CreateEmployeeViewModel model, string userId, string newEmployeePassword);

        Task<IEnumerable<TModel>> GetAllAsync<TModel>(string userId);

        Task<Result> DeleteAsync(string email);

        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<TModel> GetByIdCourseAsync<TModel>(string userId, int courseId);
    }
}
