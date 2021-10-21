namespace UpSkill.Web.Areas.Owner.Employee
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using UpSkill.Common;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.ViewModels.Employee;
    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeeController : OwnerBaseController
    {
        private readonly IEmployeesService employeesService;

        public EmployeeController(IEmployeesService employeesService)
        {
            this.employeesService = employeesService;
        }

        public async Task<Result> Create(CreateViewModel model)
        {
            var result = await this.employeesService.CreateAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok(SuccessMessage);
        }
    }
}
