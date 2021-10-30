namespace UpSkill.Web.Areas.Company
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = CompanyOwnerRoleName)]
    [ApiController]
    [Area("Company")]
    [Route("Company/[controller]")]
    public abstract class CompaniesBaseController : ControllerBase
    {
    }
}
