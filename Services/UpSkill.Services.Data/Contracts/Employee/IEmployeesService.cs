namespace UpSkill.Services.Data.Contracts.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Employee;

    public interface IEmployeesService
    {
        Task<Result> CreateAsync(CreateEmployeeViewModel model,string userId);

        Task<IEnumerable<TModel>> GetAllAsync<TModel>(string email);

        Task<Result> DeleteAsync(string email);
    }
}
