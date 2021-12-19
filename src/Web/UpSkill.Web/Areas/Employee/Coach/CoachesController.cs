namespace UpSkill.Web.Areas.Employee.Coach
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesController : EmployeesBaseController
    {
        private readonly IEmployeeService employeeService;
        private readonly ICurrentUserService currentUser;
        private readonly INLogger nlog;

        public CoachesController(
            ICurrentUserService currentUser,
            IEmployeeService employeeService,
            INLogger nlog)
        {
            this.currentUser = currentUser;
            this.employeeService = employeeService;
            this.nlog = nlog;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<OwnerCoachesListingModel>> GetAllAsync()
        {
            this.nlog.Info("Entering GetAll action");

            return await this.employeeService.GetAllCoachesAsync<OwnerCoachesListingModel>(this.currentUser.GetId());
        }

        [HttpPut]
        [Route(NotNewCoachRoute)]
        public async Task<ActionResult> SetNotNewCoachAsync(int coachId)
        {
            this.nlog.Info("Entering SetNotNewCoachAsync action");

            var result = await this.employeeService.SetNotNewCoachAsync(coachId, this.currentUser.GetId());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullySetNotNewCoach);
        }
    }
}
