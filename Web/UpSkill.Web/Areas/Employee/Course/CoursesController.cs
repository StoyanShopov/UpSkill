namespace UpSkill.Web.Areas.Employee.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : EmployeesBaseController
    {
        private readonly IEmployeeService employeeService;
        private readonly ICurrentUserService currentUser;
        private readonly NLogExtensions nLog;

        public CoursesController(
            IEmployeeService employeeService,
            ICurrentUserService currentUser,
            NLogExtensions nLog)
        {
            this.employeeService = employeeService;
            this.currentUser = currentUser;
            this.nLog = nLog;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll()
        {
            this.nLog.Info("Entering GetAll action");

            return await this.employeeService.GetAllCoursesAsync<CoursesListingModel>(this.currentUser.GetId());
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> GetByIdCourse(int courseId)
        {
            this.nLog.Info("Entering GetByIdCourse");

            return await this.employeeService.GetByIdCourseAsync<DetailsViewModel>(this.currentUser.GetId(), courseId);
        }
    }
}
