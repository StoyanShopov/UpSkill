namespace UpSkill.Web.Areas.Owner
{
    using System.Security.Claims;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = CompanyOwnerRoleName)]
    [ApiController]
    [AllowAnonymous]
    [Area(CompanyOwnerRoleName)]
    [Route("Owner/[controller]")]
    public class OwnerBaseController : ControllerBase
    {
        //TODO This must be the right way to take the userId
        //protected string UserId
        //{
        //    get
        //    {
        //        
        //        if (this.User != null && this.User.Identity.IsAuthenticated)
        //        {
        //            return this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //        }

        //        return null;
        //    }
        //}
    }
}
