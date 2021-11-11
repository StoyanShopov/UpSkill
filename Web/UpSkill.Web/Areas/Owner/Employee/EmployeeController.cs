namespace UpSkill.Web.Areas.Owner.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.EmployeeConstants;

    public class EmployeeController : OwnerBaseController
    {
        private readonly IEmployeeService employeesService;
        private readonly ICurrentUserService currentUser;
        private readonly IPasswordGeneratorService passwordGenerator;
        private readonly ILogger<EmployeeController> logger;

        public EmployeeController(
            IEmployeeService employeesService,
            ICurrentUserService currentUser,
            IPasswordGeneratorService passwordGenerator,
            ILogger<EmployeeController> logger)
        {
            this.employeesService = employeesService;
            this.currentUser = currentUser;
            this.passwordGenerator = passwordGenerator;
            this.logger = logger;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<ListEmployeesViewModel>> GetAll()
        {
            this.logger.LogInformation("Entering GetAll");
            return await this.employeesService.GetAllAsync<ListEmployeesViewModel>(this.currentUser.GetId());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeViewModel model)
        {
            var result = await this.employeesService
                .CreateAsync(model, this.currentUser.GetId(), this.passwordGenerator.CreateRandomPassword(6));

            if (result.Failure)
            {
                this.logger.LogError(result.Error);

                return this.BadRequest(result.Error);
            }

            this.logger.LogError(SuccessMessage);

            return this.Ok(SuccessMessage);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var result = await this.employeesService.DeleteAsync(id);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation(EmployeeSuccesfullyDeleted);

            return this.Ok(EmployeeSuccesfullyDeleted);
        }
    }
}
