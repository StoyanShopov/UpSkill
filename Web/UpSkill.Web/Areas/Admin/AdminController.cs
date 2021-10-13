namespace UpSkill.Web.Areas.Admin
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants;
    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AdminController : AdministrationBaseController
    {
        private readonly IAdminService adminService;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminController(
            IAdminService adminService,
            UserManager<ApplicationUser> userManager)
        {
            this.adminService = adminService;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route(AddOwnerCompany)]
        public async Task<IActionResult> AddOwnerToCompany(AddCompanyOwnerRequestModel model, int id)
        {
            var result = await this.adminService.AddCompanyOwnerToCompanyAsync(model, id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok(SuccesfullyAddedOwnerToGivenCompany);
        }

        [HttpPut]
        [Route(Promote)]
        public async Task<IActionResult> PromoteUser(string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await GetUser(email);

            if (user == null)
            {
                return BadRequest(UserNotFound);
            }

            var result = await this.adminService
                            .Promote(user);

            if (result != AssignedSuccessfully)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        [Route(Demote)]
        public async Task<IActionResult> DemoteUser(string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await GetUser(email);

            if (user == null)
            {
                return BadRequest(UserNotFound);
            }

            var result = await this.adminService
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
}
