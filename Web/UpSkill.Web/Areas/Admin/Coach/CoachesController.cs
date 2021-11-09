namespace UpSkill.Web.Areas.Admin.Coach
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesController : AdministrationBaseController
    {
        private readonly ICoachServices coachServices;
        private readonly ILogger<CoachesController> logger;

        public CoachesController(
            ICoachServices coachServices,
            ILogger<CoachesController> logger)
        {
            this.coachServices = coachServices;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCoachRequestModel model)
        {
            this.logger.LogInformation("Entering Create action (admin)");

            var result = await this.coachServices.CreateAsync(model);

            if (result.Failure)
            {
                this.logger.LogError(result.Error.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Coach created (admin)");

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] UpdateCoachRequestMode model, int id)
        {
            this.logger.LogInformation("Entering Edit action (admin)");

            var result = await this.coachServices.EditAsync(model, id);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Coach edited (admin)");

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            this.logger.LogInformation("Entering Delete action (admin)");

            var result = await this.coachServices.DeleteAsync(id);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Coach deleted (admin)");

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoachListingModel>> GetAll()
        {
            this.logger.LogInformation("Entering GetAllaction (admin)");

            return await this.coachServices.GetAllAsync<CoachListingModel>();
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CoachDetailsModel> GetDetails(int id)
        {
            this.logger.LogInformation("Entering GetDetails action (admin)");

            return await this.coachServices.GetByIdAsync<CoachDetailsModel>(id);
        }
    }
}
