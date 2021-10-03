namespace UpSkill.Web.Controllers.SuperAdminController
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Admin;
    using UpSkill.Web.ViewModels.Administration.Courses;

    using static Common.GlobalConstants.AdminControllerConstants;

    public class CoursesController : Controller
    {
        private readonly Repository repository;

        public CoursesController(Repository repository)
        {
            this.repository = repository;
        }

        public async Task<ActionResult> CreateCourse(CourseFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessage);
            }

            await this.repository.CreateCourse(model);

            return Ok(SuccessMessage);
        }

        public async Task<ActionResult> GetCourseById(string id)
        {
            var result = await this.repository.GetCourseById(id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(result);
        }

        public async Task<ActionResult> EditCourse(CourseFormModel model, string id)
        {
            var result = await this.repository.EditCourse(model, id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(SuccessMessage);
        }

        public async Task<ActionResult> DeleteCourse(string id)
        {
            var result = await this.repository.DeleteCourse(id);

            if (result == null)
            {
                return BadRequest(ErrorMessage);
            }

            return Ok(SuccessMessage);
        }
    }
}
