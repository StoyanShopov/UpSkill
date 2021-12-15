namespace UpSkill.Web.Areas.Employee.Coach
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Coach;
    using static Common.GlobalConstants.ControllerRoutesConstants;

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
    }
}
