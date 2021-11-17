namespace UpSkill.Web.Areas.Admin.Coach
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesController : AdministrationBaseController
    {
        private readonly ICoachServices coachServices;
        private readonly NLogExtensions nLog;

        public CoachesController(
            ICoachServices coachServices,
            NLogExtensions nLog)
        {
            this.coachServices = coachServices;
            this.nLog = nLog;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCoachRequestModel model)
        {
            var result = await this.coachServices.CreateAsync(model);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] UpdateCoachRequestMode model, int id)
        {
            var result = await this.coachServices.EditAsync(model, id);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.coachServices.DeleteAsync(id);

            if (result.Failure)
            {
                this.nLog.Error(id, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(id);

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoachListingModel>> GetAll()
        {
            this.nLog.Info("Entering GetAllaction");

            return await this.coachServices.GetAllAsync<CoachListingModel>();
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CoachDetailsModel> GetDetails(int id)
        {
            this.nLog.Info("Entering GetDetails action");

            return await this.coachServices.GetByIdAsync<CoachDetailsModel>(id);
        }
    }
}
