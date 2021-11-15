namespace UpSkill.Web.Areas.Owner.Employee
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeeController : OwnerBaseController
    {
        private readonly IEmployeeService employeesService;
        private readonly ICurrentUserService currentUser;
        private readonly IPasswordGeneratorService passwordGenerator;

        public EmployeeController(
            IEmployeeService employeesService,
            ICurrentUserService currentUser,
            IPasswordGeneratorService passwordGenerator)
        {
            this.employeesService = employeesService;
            this.currentUser = currentUser;
            this.passwordGenerator = passwordGenerator;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<ListEmployeesViewModel>> GetAll()
        {
            NLogExtensions.GetInstance().Info("Entering GetAll");
            return await this.employeesService.GetAllAsync<ListEmployeesViewModel>(this.currentUser.GetId());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeViewModel model)
        {
            var result = await this.employeesService
                .CreateAsync(model, this.currentUser.GetId(), this.passwordGenerator.CreateRandomPassword(6));

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(model);

            return this.Ok(SuccessMessage);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var result = await this.employeesService.DeleteAsync(id);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(id, new Exception(result.Failure.ToString()));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(id);

            return this.Ok(EmployeeSuccesfullyDeleted);
        }
    }
}
