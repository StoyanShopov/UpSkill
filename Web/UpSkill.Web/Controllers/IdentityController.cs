namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.ModelBinding;
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
            if (await this.identity.IsEmailExist(model.Email))
            {
                ModelState.AddModelError(nameof(model.Email), "There is such exist user with this email.");
            }

            if (await this.identity.IsUsernameExist(model.Username))
            {
                ModelState.AddModelError(nameof(model.Username), "There is such exist user with this username.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
                return BadRequest(ModelState);
            }

            var token = await this.identity.LoginAsync(model);

            return token;
        }
    }
}
