﻿namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;

    using System.Threading.Tasks;
    using System.Security.Claims;

    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

    using static Common.GlobalConstants.IdentityConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class IdentityController : ApiController
    {
        private readonly IIdentityService identity;
        private readonly UserManager<ApplicationUser> userManager;

        public IdentityController(
            IIdentityService identity,
            UserManager<ApplicationUser> userManager)
        {
            this.identity = identity;
            this.userManager = userManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(RegisterRoute)]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            await ValidateRegisterModel(model);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await this.identity.RegisterAsync(model);

            return StatusCode(201);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(LoginRoute)]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var embededToken = await this.identity.LoginAsync(model);

            //this adds JWT to the cookie
            Response.Cookies.Append(JWT, embededToken.Token, new CookieOptions()
            {
                HttpOnly = true
            });

            return Ok(embededToken);
        }

        [HttpPost]
        [Authorize]
        [Route(LogoutRoute)]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(JWT);

            return Ok(new { message = SuccessMessage });
        }

        [HttpGet]
        [Authorize]
        [Route(UserRoute)]
        public async Task<LoginResponseModel> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new LoginResponseModel
            {
                Id = user.Id,
                Email = user.Email,
            };
        }

        private async Task ValidateRegisterModel(RegisterRequestModel model)
        {
            if (await this.userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError(nameof(model.Email), EmailExist);
            }

            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError(nameof(model.Password), PasswordNotMatch);
            }
        }
    }
}
