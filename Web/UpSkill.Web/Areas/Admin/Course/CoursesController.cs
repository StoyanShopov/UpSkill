namespace UpSkill.Web.Areas.Admin.Course
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesController : AdministrationBaseController
    {
        private readonly ICourseService coursesService;

        public CoursesController(ICourseService coursesService)
        {
            this.coursesService = coursesService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCourseViewModel model)
        {
            var result = await this.coursesService.CreateAsync(model);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(model);

            return this.Ok(SuccesfullyCreated);
        }

        [HttpPost]
        [Route(AddCompanyOwnerToCourseRoute)]
        public async Task<IActionResult> AddCompany(AddCompanyToCourseViewModel model)
        {
            var result = await this.coursesService.AddCompanyAsync(model);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(model);

            return this.Ok(SuccesfullyAddedCompanyOwnerToGivenCourse);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] EditCourseViewModel model, int id)
        {
            var result = await this.coursesService.EditAsync(model, id);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(model);

            return this.Ok(SuccesfullyEdited);
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> Details(int id)
        {
            NLogExtensions.GetInstance().Info("Entering Details action (admin)");

            return await this.coursesService
                       .GetByIdAsync<DetailsViewModel>(id);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.coursesService.DeleteAsync(id);

            if (result.Failure)
            {
                NLogExtensions.GetInstance().Error(id, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            NLogExtensions.GetInstance().Info(SuccesfullyDeleted);

            return this.Ok(SuccesfullyDeleted);
        }
    }
}
