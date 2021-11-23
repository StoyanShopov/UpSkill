namespace UpSkill.Web.Areas.Coach
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Common.GlobalConstants.RolesNamesConstants;

    //[Authorize(Roles = CoachRoleName)]
    [ApiController]
    [Area("Coach")]
    [Route("Coach/[controller]")]
    public abstract class CoachBaseController : ControllerBase
    {
    }
}
