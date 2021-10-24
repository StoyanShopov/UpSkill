namespace UpSkill.Web.Areas.Admin.Coach
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesController : AdministrationBaseController
    {
        private readonly ICoachServices coachServices;

        public CoachesController(ICoachServices coachServices)
            => this.coachServices = coachServices;

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCoachRequestModel model, IFormFile file)
        {
            var result = await this.coachServices.CreateAsync(model, file.ToString());

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UpdateCoachRequestMode model, int id)
        {
            var result = await this.coachServices.EditAsync(model, id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.coachServices.DeleteAsync(id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoachListingModel>> GetAll()
            => await this.coachServices.GetAllAsync<CoachListingModel>();

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CoachDetailsModel> GetDetails(int id)
            => await this.coachServices.GetByIdAsync<CoachDetailsModel>(id);
    }
}
