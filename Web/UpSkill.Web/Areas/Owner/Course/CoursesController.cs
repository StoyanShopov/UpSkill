namespace UpSkill.Web.Areas.Owner.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Areas.Company;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : OwnerBaseController
    {
        private readonly IOwnerServices ownerService;
        private readonly ICurrentUserService currentUser;

        public CoursesController(
            IOwnerServices ownerService,
            ICurrentUserService currentUser)
        {
            this.ownerService = ownerService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll()
            => await this.ownerService.GetAllCoursesAsync<CoursesListingModel>(this.currentUser.GetId());
    }
}
