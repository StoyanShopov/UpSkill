namespace UpSkill.Web.Areas.Admin
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = AdministratorRoleName)]
    [ApiController]
    [AllowAnonymous]
    [Area("Admin")]
    [Route("Admin/[controller]")]
    public abstract class AdministrationBaseController : ControllerBase
    {
    }
}
