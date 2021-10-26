﻿namespace UpSkill.Web.Areas.Owner.Course
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Common;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;
    using static Common.GlobalConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

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

        [HttpPut]
        [Route("enable")]
        public async Task<IActionResult> EnableCourse(GetOwnerAndCourseByIdViewModel viewModel)
        {
            var result = await this.coursesService.EnableCourse(viewModel);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(result.Succeeded);
        }

        [HttpPut]
        [Route("disable")]
        public async Task<IActionResult> DisableCourse(GetOwnerAndCourseByIdViewModel viewModel)
        {
            var result = await this.coursesService.DisableCourse(viewModel);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(result.Succeeded);
        }

        [HttpGet]
        [Route("getall")]
        public async Task<IEnumerable<DetailsViewModel>> GetAll()
           => await this.coursesService.GetAll<DetailsViewModel>();
    }
}
