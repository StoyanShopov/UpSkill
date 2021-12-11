namespace UpSkill.Web.Areas.Employee
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = CompanyEmployeeRoleName)]
    [ApiController]
    [Area("Employee")]
    [Route("Employee/[controller]")]
    public abstract class EmployeesBaseController : ControllerBase
    {
    }
}
