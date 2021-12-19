namespace UpSkill.Web.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class CoachesController : ApiController
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

        [HttpGet]
        [Route(GetAllCategories)]
        public async Task<IEnumerable<string>> GetCategories()
            => await this.coachServices.GetAllCategoriesAsync<CoachesFieldsViewModel>();
    }
}
