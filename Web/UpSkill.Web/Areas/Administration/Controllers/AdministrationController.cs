namespace UpSkill.Web.Areas.Administration.Controllers
{
    using UpSkill.Common;
    using UpSkill.Web.Controllers;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
    [ApiController]
    [Route("[controller]")]
    [Area("Administration")]
    public class AdministrationController : ControllerBase 
    {
    }
}
