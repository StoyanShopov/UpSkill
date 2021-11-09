using Microsoft.AspNetCore.Authorization;

namespace UpSkill.Web.Areas.Owner.Employee
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;
    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeeController : OwnerBaseController
    {
        private readonly IEmployeesService employeesService;
        private readonly ICurrentUserService currentUser;
        private readonly IPasswordGeneratorService passwordGenerator;

        public EmployeeController(IEmployeesService employeesService, ICurrentUserService currentUser, IPasswordGeneratorService passwordGenerator)
        {
            this.employeesService = employeesService;
            this.currentUser = currentUser;
            this.passwordGenerator = passwordGenerator;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<ListEmployeesViewModel>> GetAll()
            => await this.employeesService.GetAllAsync<ListEmployeesViewModel>(this.currentUser.GetId());

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeViewModel model)
        {
            var result = await this.employeesService.CreateAsync(model, this.currentUser.GetId(), this.passwordGenerator.CreateRandomPassword(6));

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccessMessage);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var result = await this.employeesService.DeleteAsync(id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(EmployeeSuccesfullyDeleted);
        }
    }
}
