using Microsoft.AspNetCore.Http;

namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

    public class IdentityController : ApiController
    {
        private readonly IIdentityService identity; 

        public IdentityController(IIdentityService identity) => this.identity = identity;

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Register))]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await this.identity.RegisterAsync(model);

            return StatusCode(201);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //this adds jwt tothe cookie
            var embededToken = await this.identity.LoginAsync(model);

            Response.Cookies.Append("jwt", embededToken.Token, new CookieOptions()
            {
                HttpOnly = true
            });

            return Ok(new { message = "success" });
        }
    }
}
