namespace UpSkill.Web.Areas.Owner.Course
{
    using System;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesController : OwnerBaseController
    {
        private readonly ICourseService coursesService;
        private readonly IOwnerCoursesService ownerCoursesService;
        private readonly ICurrentUserService currentUserService;

        public CoursesController(
            ICourseService coursesService,
            IOwnerCoursesService ownerCoursesService,
            ICurrentUserService currentUserService)
        {
            this.coursesService = coursesService;
            this.ownerCoursesService = ownerCoursesService;
            this.currentUserService = currentUserService;
        }

        [HttpPost]
        [Route(NewCourseRequest)]
        public async Task<IActionResult> RequestCourse(RequestCourseViewModel model)
        {
            try
            {
                await this.ownerCoursesService.RequestCourseAsync(model);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

            return this.Ok("👍");
        }

        [HttpDelete]
        [Route(Disable)]
        public async Task<IActionResult> DisableCourse(int id)
        {
            var currentUser = this.currentUserService.GetId();
            var result = await this.ownerCoursesService.DisableCourseAsync(id, currentUser);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(result.Succeeded);
        }

        [HttpPost]
        [Route(AddCompanyOwnerToCourseRoute)]
        public async Task<IActionResult> AddCompany(AddCompanyToCourseViewModel model)
        {
            var result = await this.coursesService.AddCompanyAsync(model);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyAddedCompanyOwnerToGivenCourse);
        }

        [HttpGet]
        [Route(ActiveCourses)]
        public async Task<IEnumerable<DetailsViewModel>> GetActiveCourses()
        {
            return await this.ownerCoursesService
                             .GetActiveCoursesAsync<DetailsViewModel>(this.currentUserService.GetId());
        }
    }
}
