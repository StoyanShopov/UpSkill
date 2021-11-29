namespace UpSkill.Web.Areas.Owner.Course
{
    using System;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : OwnerBaseController
    {
        private readonly IOwnerCoursesService coursesService;
        private readonly ICurrentUserService currentUserService;

        public CoursesController(
            IOwnerCoursesService coursesService,
            ICurrentUserService currentUserService)
        {
            this.coursesService = coursesService;
            this.currentUserService = currentUserService;
        }

        [HttpPost]
        [Route(NewCourseRequest)]
        public async Task<IActionResult> RequestCourse(RequestCourseViewModel model)
        {
            try
            {
                await this.coursesService.RequestCourseAsync(model);
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
            var result = await this.coursesService.DisableCourseAsync(id, currentUser);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(result.Succeeded);
        }

        [HttpGet]
        [Route(ActiveCourses)]
        public async Task<IEnumerable<DetailsViewModel>> GetActiveCourses()
        {
            return await this.coursesService
                             .GetActiveCoursesAsync<DetailsViewModel>(this.currentUserService.GetId());
        }
    }
}
