namespace UpSkill.Web.Areas.Admin.Course
{

    using System.Collections.Generic;
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoursesController : AdministrationBaseController
    {
        private readonly ICourseService coursesService;
        private readonly INLogger nLog;

        public CoursesController(
            ICourseService coursesService,
            INLogger nLog)
        {
            this.coursesService = coursesService;
            this.nLog = nLog;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCourseViewModel model)
        {
            var result = await this.coursesService.CreateAsync(model);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyCreated);
        }

        [HttpPost]
        [Route(AddCompanyOwnerToCourseRoute)]
        public async Task<IActionResult> AddCompany(AddCompanyToCourseViewModel model)
        {
            var result = await this.coursesService.AddCompanyAsync(model);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyAddedCompanyOwnerToGivenCourse);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] EditCourseViewModel model, int id)
        {
            var result = await this.coursesService.EditAsync(model, id);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyEdited);
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<DetailsViewModel> Details(int id)
        {
            this.nLog.Info("Entering Details action (admin)");

            return await this.coursesService
                       .GetByIdAsync<DetailsViewModel>(id);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.coursesService.DeleteAsync(id);

            if (result.Failure)
            {
                this.nLog.Error(id, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(SuccesfullyDeleted);

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<DetailsViewModel>> GetAll()
        => await this.coursesService.GetAllAsync<DetailsViewModel>();
    }
}
