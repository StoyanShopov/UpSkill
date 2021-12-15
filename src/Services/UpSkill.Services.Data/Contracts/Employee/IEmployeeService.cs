namespace UpSkill.Services.Data.Contracts.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;

    using UpSkill.Web.ViewModels.Employee;

    public interface IEmployeeService
    {
        Task<Result> CreateAsync(CreateEmployeeViewModel model, string userId, string newEmployeePassword);

        Task<IEnumerable<TModel>> GetAllAsync<TModel>(string userId);

        Task<Result> DeleteAsync(string id);

        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<TModel> GetByIdCourseAsync<TModel>(string userId, int courseId);

        Task<IEnumerable<TModel>> GetCompanyEmployeesAsync<TModel>(string userId);

        Task<TModel> GetEmployeeInfo<TModel>(string userId);

        Task<TModel> GetEmployeeProfile<TModel>(string userId);

        Task<Result> EditAsync(UpdateEmployeeRequestModel model, string userId);

        Task<IEnumerable<TModel>> GetAllCoachesAsync<TModel>(string userId);
    }
}
