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
    }
}
