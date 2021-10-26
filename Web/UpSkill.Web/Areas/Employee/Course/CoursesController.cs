namespace UpSkill.Web.Areas.Employee.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : EmployeesBaseController
    {
        private readonly IEmployeeService employeeService;

        public CoursesController(IEmployeeService employeeService)
            => this.employeeService = employeeService;

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll(int companyId)
            => await this.employeeService.GetAllCoursesAsync<CoursesListingModel>(companyId);
    }
}
