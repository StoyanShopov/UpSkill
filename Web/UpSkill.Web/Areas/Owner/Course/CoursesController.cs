namespace UpSkill.Web.Areas.Owner.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.Infrastructure.Services;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CoursesController : OwnerBaseController
    {
        private readonly IOwnerServices ownerService;
        private readonly ICurrentUserService currentUser;
        private readonly NLogExtensions nLog;

        public CoursesController(
            IOwnerServices ownerService,
            ICurrentUserService currentUser,
            NLogExtensions nLog)
        {
            this.ownerService = ownerService;
            this.currentUser = currentUser;
            this.nLog = nLog;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CoursesListingModel>> GetAll()
        {
            this.nLog.Info("Entering getAll action");
            return await this.ownerService.GetAllCoursesAsync<CoursesListingModel>(this.currentUser.GetId());
        }
    }
}
