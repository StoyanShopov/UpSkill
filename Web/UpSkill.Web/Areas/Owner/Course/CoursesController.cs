namespace UpSkill.Web.Areas.Owner.Course
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants;

    [AllowAnonymous]
    public class CoursesController : OwnerBaseController
    {
        private readonly IOwnerCoursesService coursesService;

        public CoursesController(IOwnerCoursesService coursesService)
        {
            this.coursesService = coursesService;
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
    }
}
