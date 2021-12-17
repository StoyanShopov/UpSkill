namespace UpSkill.Web.Areas.Employee.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesController : EmployeesBaseController
    {
        private readonly IEmployeeService employeeService;
        private readonly ICurrentUserService currentUser;
        private readonly INLogger nlog;

        public CoursesController(
            IEmployeeService employeeService,
            ICurrentUserService currentUser,
            INLogger nlog)
        {
            this.employeeService = employeeService;
            this.currentUser = currentUser;
            this.nlog = nlog;
        }

        [HttpPost]
        [Route(AddEmployeeToCourseRoute)]
        public async Task<ActionResult> AddEmployeeToCourseAsync(int courseId)
        {
            this.nlog.Info("Entering AddEmployeeToCourse action");

            var result = await this.employeeService.AddCourseToEmoployeeAsync(courseId, this.currentUser.GetId());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyAddedCourseToEmployee);
        }

        [HttpGet]
        [Route(EnrolledCourses)]
        public async Task<IEnumerable<EmployeeCoursesListingModel>> GetAllEmployeeCoursesAsync()
        {
            this.nlog.Info("Entering GetAllEmployeeCoursesAsync action");

            return await this.employeeService.GetEmployeeCoursesAsync<EmployeeCoursesListingModel>(this.currentUser.GetId());
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<EmployeeCoursesListingModel>> GetAll()
        {
            this.nlog.Info("Entering GetAll action");

            return await this.employeeService.GetAllCoursesAsync<EmployeeCoursesListingModel>(this.currentUser.GetId());
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> GetByIdCourse(int courseId)
        {
            this.nlog.Info("Entering GetByIdCourse");

            return await this.employeeService.GetByIdCourseAsync<DetailsViewModel>(this.currentUser.GetId(), courseId);
        }
    }
}
