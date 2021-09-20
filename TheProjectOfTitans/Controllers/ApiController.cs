namespace TheProjectOfTitans.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [ApiController]
    [Route("[controller]")] 
    public abstract class ApiController : ControllerBase
    {
    }
}
