namespace UpSkill.Web.Areas.Admin.Course
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using Services.Data.Contracts.Course;
    using ViewModels.Course;
    using Data.Models;


    [AllowAnonymous]
    public class CoursesController : AdministrationBaseController
    {
        private readonly ICoursesService coursesService;

        public CoursesController(ICoursesService coursesService)
        {
            this.coursesService = coursesService;
        }

        [HttpGet]
        [Route("Details")]
        public IActionResult Details(int id)
        {
            var result = this.coursesService.GetDetailsForCourse(id);

            if (result == null)
            {
                return BadRequest("ne raboti");
            }

            return Ok("ekstra e");
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CreateCourseViewModel model)
        {
            var result = await this.coursesService.CreateAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok("ekstra e");
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit(EditCourseViewModel model)
        {
            var result = await this.coursesService.EditAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok("ekstra e");
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.coursesService.DeleteAsync(id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok("ekstra e");
        }
    }
}
