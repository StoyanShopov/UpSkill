namespace UpSkill.Services.Data.Contracts.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Employee;

    public interface IEmployeesService
    {
        Task<Result> CreateAsync(CreateEmployeeViewModel model);

        Task<List<TModel>> GetAllAsync<TModel>();
    }
}