namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Admin.Users;
    using UpSkill.Web.ViewModels.Administration.Users;

    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants;

    [AllowAnonymous]
    //[Authorize(Roles ="Administrator")]
    public class AdminController : ApiController
    {
        private readonly IAdminUsersService adminUsersService;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminController(IAdminUsersService adminUsersService,
            UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
            this.adminUsersService = adminUsersService;
        }

        [HttpPut]
        [Route("/PromoteUser")]
        public async Task<IActionResult> PromoteUser(UserByEmailViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await GetUser(viewModel.Email);

            if (user == null)
            {
                return BadRequest(UserNotFound);
            }

            var result = await this.adminUsersService
                            .Promote(user);

            if (result != AssignedSuccessfully)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        [Route("/DemoteUser")]
        public async Task<IActionResult> DemoteUser(UserByEmailViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await GetUser(viewModel.Email);

            if (user == null)
            {
                return BadRequest(UserNotFound);
            }

            var result = await this.adminUsersService
                           .Demote(user);

            if (result != UnassignedSuccessfully)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        private async Task<ApplicationUser> GetUser(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            return user;
    }
}
