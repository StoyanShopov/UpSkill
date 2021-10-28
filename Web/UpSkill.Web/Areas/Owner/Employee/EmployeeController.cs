using System.Collections.Generic;

namespace UpSkill.Web.Areas.Owner.Employee
{

    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;
    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeeController : OwnerBaseController
    {
        private readonly IEmployeesService employeesService;

        public EmployeeController(IEmployeesService employeesService)
        {
            this.employeesService = employeesService;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<ListEmployeesViewModel>> GetAll(string email)
            => await this.employeesService.GetAllAsync<ListEmployeesViewModel>(email);

        //[HttpPost]
        //public async Task<IActionResult> Create([FromForm] CreateEmployeeViewModel model)
        //{
        //    var result = await this.employeesService.CreateAsync(model);

        //    if (result.Failure)
        //    {
        //        return this.BadRequest(result.Error);
        //    }

        //    return this.Ok(SuccessMessage);
        //}

        //[HttpDelete]
        //[Route(DeleteRoute)]
        //public async Task<IActionResult> DeleteAsync(string id)
        //{
        //    var result = await this.employeesService.DeleteAsync(id);

        //    if (result.Failure)
        //    {
        //        return this.BadRequest(result.Error);
        //    }

        //    return this.Ok(EmployeeSuccesfullyDeleted);
        //}
    }
}
