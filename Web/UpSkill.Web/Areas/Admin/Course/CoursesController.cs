namespace UpSkill.Web.Areas.Admin.Course
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using Services.Data.Contracts.Course;
    using ViewModels.Course;

    [AllowAnonymous]
    public class CoursesController : AdministrationBaseController
    {
        private readonly ICoursesService coursesService;

        public CoursesController(ICoursesService coursesService)
        {
            this.coursesService = coursesService;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CreateCourseViewModel model)
        {
            return Ok("ekstra e");
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit(EditCourseViewModel model)
        {
            return Ok("ekstra e");
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok("ekstra e");
        }
    }
}
