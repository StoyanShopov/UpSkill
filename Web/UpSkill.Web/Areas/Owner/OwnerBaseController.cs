namespace UpSkill.Web.Areas.Company
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = CompanyOwnerRoleName)]
    [ApiController]
    [Area("Owner")]
    [Route("Owner/[controller]")]
    public abstract class OwnerBaseController : ControllerBase
    {
    }
}
