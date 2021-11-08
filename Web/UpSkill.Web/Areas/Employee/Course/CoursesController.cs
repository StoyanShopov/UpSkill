namespace UpSkill.Web.Areas.Employee.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : EmployeesBaseController
    {
        private readonly IEmployeeService employeeService;
        private readonly ICurrentUserService currentUser;
        private readonly ILogger<CoursesController> logger;

        public CoursesController(
            IEmployeeService employeeService,
            ICurrentUserService currentUser,
            ILogger<CoursesController> logger)
        {
            this.employeeService = employeeService;
            this.currentUser = currentUser;
            this.logger = logger;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll()
        {
            this.logger.LogInformation("Entering GetAll action (owner)");

            return await this.employeeService.GetAllCoursesAsync<CoursesListingModel>(this.currentUser.GetId());
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> GetByIdCourse(int courseId)
        {
            this.logger.LogInformation("Entering GetByIdCourse (owner)");

            return await this.employeeService.GetByIdCourseAsync<DetailsViewModel>(this.currentUser.GetId(), courseId);
        }
    }
}
