namespace UpSkill.Web.Areas.Company.Employee
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Employee;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class EmployeesController : OwnerBaseController
    {
        private readonly IEmployeeService employeeService;
        private readonly ICurrentUserService currentUser;

        public EmployeesController(
            IEmployeeService employeeService,
            ICurrentUserService currentUser)
        {
            this.employeeService = employeeService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<EmployeesListingModel>> GetAll()
            => await this.employeeService.GetCompanyEmployeesAsync<EmployeesListingModel>(this.currentUser.GetId());

        [HttpGet]
        [Route(GetCountRoute)]
        public async Task<string> GetCount()
            => await this.employeeService.CountCompanyEmployees(this.currentUser.GetId());
    }
}
