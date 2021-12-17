namespace UpSkill.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.ViewModels.Course;

    public class CoursesController
    {
        private readonly ICourseService courseService;

        public CoursesController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        [HttpGet]
        [Route("[controller]/getAll")]
        public async Task<IEnumerable<AdminCoursesDetailsViewModel>> GetAll()
            => await this.courseService.GetAllAsync<AdminCoursesDetailsViewModel>();
    }
}
