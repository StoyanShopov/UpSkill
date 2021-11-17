namespace UpSkill.Web.Areas.Owner.Coach
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Areas.Owner;

    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoachesController : OwnerBaseController
    {
        private readonly IOwnerServices ownerService;
        private readonly ICurrentUserService currentUser;

        public CoachesController(
            IOwnerServices ownerService,
            ICurrentUserService currentUser)
        {
            this.ownerService = ownerService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoachListingModel>> GetAll()
        {
            NLogExtensions.GetInstance().Info("Entering getAll action");

            return await this.ownerService.GetAllCoachesAsync<CoachListingModel>(this.currentUser.GetId());
        }
    }
}
