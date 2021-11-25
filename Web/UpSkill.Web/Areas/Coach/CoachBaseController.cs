namespace UpSkill.Web.Areas.Coach
{
    using Microsoft.AspNetCore.Mvc;

    // [Authorize(Roles = CoachRoleName)]
    [ApiController]
    [Area("Coach")]
    [Route("Coach/[controller]")]
    public abstract class CoachBaseController : ControllerBase
    {
    }
}
