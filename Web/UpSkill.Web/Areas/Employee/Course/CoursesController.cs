namespace UpSkill.Web.Areas.Employee.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Employee;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : EmployeesBaseController
    {
        private readonly IEmployeesService employeeService;
        private readonly ICurrentUserService currentUser;

        public CoursesController(
            IEmployeesService employeeService,
            ICurrentUserService currentUser)
        {
            this.employeeService = employeeService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll()
            => await this.employeeService.GetAllCoursesAsync<CoursesListingModel>(this.currentUser.GetId());

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> GetByIdCourse(int courseId)
            => await this.employeeService.GetByIdCourseAsync<DetailsViewModel>(this.currentUser.GetId(), courseId);
    }
}
