namespace UpSkill.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.ViewModels.Coach;

    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;
    using static UpSkill.Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesController : ControllerBase
    {
        private readonly ICoachServices coachServices;

        public CoachesController(
            ICoachServices coachService)
        {
            this.coachServices = coachService;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoachListingModel>> GetAll()
            => await this.coachServices.GetAllAsync<CoachListingModel>();
    }
}
