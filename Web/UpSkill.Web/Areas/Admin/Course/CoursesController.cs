namespace UpSkill.Web.Areas.Admin.Course
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesController : AdministrationBaseController
    {
        private readonly ICoursesService coursesService;
        private readonly ILogger<CoursesController> logger;

        public CoursesController(
            ICoursesService coursesService,
            ILogger<CoursesController> logger)
        {
            this.coursesService = coursesService;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCourseViewModel model)
        {
            this.logger.LogInformation("Entering Create action (admin)");

            var result = await this.coursesService.CreateAsync(model);

            if (result.Failure)
            {
                this.logger.LogError(result.Error);

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Course created  (admin)");

            return this.Ok(SuccesfullyCreated);
        }

        [HttpPost]
        [Route(AddCompanyOwnerToCourseRoute)]
        public async Task<IActionResult> AddCompany(AddCompanyToCourseViewModel model)
        {
            this.logger.LogInformation("Entering AddCompany action (admin)");

            var result = await this.coursesService.AddCompanyAsync(model);

            if (result.Failure)
            {
                this.logger.LogError(result.Error + "(admin)");

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Company to course added (admin)");

            return this.Ok(SuccesfullyAddedCompanyOwnerToGivenCourse);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] EditCourseViewModel model, int id)
        {
            this.logger.LogInformation("Entering Edit action (admin)");

            var result = await this.coursesService.EditAsync(model, id);

            if (result.Failure)
            {
                this.logger.LogError(result.Error);

                return this.BadRequest(result.Error + "(admin)");
            }
            this.logger.LogInformation("Course edited (admin)");

            return this.Ok(SuccesfullyEdited);
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> Details(int id)
        {
            this.logger.LogInformation("Entering Details action (admin)");

            return await this.coursesService
                       .GetByIdAsync<DetailsViewModel>(id);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            this.logger.LogInformation("Entering Details action (admin)");

            var result = await this.coursesService.DeleteAsync(id);

            if (result.Failure)
            {
                this.logger.LogError(result.Error);

                return this.BadRequest(result.Error + "(admin)");
            }

            this.logger.LogInformation("Course deleted (admin)");

            return this.Ok(SuccesfullyDeleted);
        }
    }
}
