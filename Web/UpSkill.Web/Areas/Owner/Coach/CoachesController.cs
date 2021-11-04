namespace UpSkill.Web.Areas.Owner.Coach
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Areas.Company;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Coach;
    using UpSkill.Web.ViewModels.Owner;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

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
        public async Task<IEnumerable<OwnerCoachesListingModel>> GetAll()
            => await this.ownerService.GetAllCoachesAsync<OwnerCoachesListingModel>(this.currentUser.GetId());

        [HttpPut]
        public async Task<IActionResult> AddCoachToOwner(AddCoachToCompanyModel modal)
        {
            var result = await this.ownerService.AddCoachAsync(modal);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyAddedCoachToGivenCompany);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCoachFromOwner(AddCoachToCompanyModel modal)
        {
            var result = await this.ownerService.RemoveCoachAsync(modal);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyDeleted);
        }
    }
}
