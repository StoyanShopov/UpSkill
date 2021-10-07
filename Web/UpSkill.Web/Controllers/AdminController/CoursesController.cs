namespace UpSkill.Web.Controllers.AdminController
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Admin;
    using UpSkill.Web.ViewModels.Administration.Courses;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.AdminControllerConstants;

    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ApiController
    {
        private readonly CoursesService coursesService;

        public CoursesController(CoursesService coursesService)
        {
            this.coursesService = coursesService;
        }

        [HttpPost]
        [Route(CreateRouteName)]
        public async Task<ActionResult> CreateCourse(CourseInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessage);
            }

            await this.coursesService.CreateCourse(model);

            return Ok(SuccessMessage);
        }

        [HttpGet]
        [Route(GetRouteName)]
        public async Task<ActionResult> GetCourseById(string id)
        {
            var result = await this.coursesService.GetCourseById(id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(result);
        }

        [HttpPut]
        [Route(EditRouteName)]
        public async Task<ActionResult> EditCourse(CourseInputModel model, string id)
        {
            var result = await this.coursesService.EditCourse(model, id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(SuccessMessage);
        }

        [HttpDelete]
        [Route(DeleteRouteName)]
        public async Task<ActionResult> DeleteCourse(string id)
        {
            var result = await this.coursesService.DeleteCourse(id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(SuccessMessage);
        }
    }
}
