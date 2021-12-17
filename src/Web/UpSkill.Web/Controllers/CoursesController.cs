namespace UpSkill.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Category;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.ViewModels.Category;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class CoursesController : ApiController
    {
        private readonly ICourseService courseService;
        private readonly ICategoriesService categoriesService;

        public CoursesController(
            ICourseService courseService,
            ICategoriesService categoriesService)
        {
            this.courseService = courseService;
            this.categoriesService = categoriesService;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<AdminCoursesDetailsViewModel>> GetAll()
            => await this.courseService.GetAllAsync<AdminCoursesDetailsViewModel>();

        [HttpGet]
        [Route(GetAllCategories)]
        public async Task<IEnumerable<CategoriesListingViewModel>> GetCategories()
            => await this.categoriesService.GetAllAsync<CategoriesListingViewModel>();
    }
}
