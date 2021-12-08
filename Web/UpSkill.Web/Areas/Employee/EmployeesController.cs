namespace UpSkill.Web.Areas.Employee
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllersResponseMessages;

    public class EmployeesController : EmployeesBaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly INLogger nLog;
        private readonly ICurrentUserService currentUser;
        private readonly IEmployeeService employeeService;

        public EmployeesController(
            INLogger nLog,
            UserManager<ApplicationUser> userManager,
            ICurrentUserService currentUser,
            IEmployeeService employeeService)
        {
            this.userManager = userManager;
            this.nLog = nLog;
            this.currentUser = currentUser;
            this.employeeService = employeeService;
        }

        [HttpGet]
        public async Task<EmployeeProfileEditViewModel> GetUserInfo()
        {
            var userId = this.currentUser.GetId();
            var user = await this.userManager.FindByIdAsync(userId);

            if (user == null)
            {
                this.nLog.Error(user, new Exception(UserDoNotExist));

                return null;
            }

            var employee = await this.employeeService.GetEmployeeInfo<EmployeeProfileEditViewModel>(userId);

            this.nLog.Info(employee);

            return employee;
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] UpdateEmployeeRequestModel model, string id)
        {
            var result = await this.employeeService.EditAsync(model, id);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyEdited);
        }
    }
}
