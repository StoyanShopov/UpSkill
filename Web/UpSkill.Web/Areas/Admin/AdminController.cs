namespace UpSkill.Web.Areas.Admin
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.ViewModels.Administration;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
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
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyAddedOwnerToGivenCompany);
        }

        [HttpPut]
        [Route(Promote)]
        public async Task<IActionResult> PromoteUser(string email)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return this.BadRequest(UserNotFound);
            }

            var result = await this.adminService
                            .Promote(user);

            if (result != AssignedSuccessfully)
            {
                return this.BadRequest(result);
            }

            return this.Ok(result);
        }

        [HttpPut]
        [Route(Demote)]
        public async Task<IActionResult> DemoteUser(string email)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return this.BadRequest(UserNotFound);
            }

            var result = await this.adminService
                           .Demote(user);

            if (result != UnassignedSuccessfully)
            {
                return this.BadRequest(result);
            }

            return this.Ok(result);
        }

        [HttpGet]
        public async Task<PromoteDemoteUserResponseModel> GetUser(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);
            var roles = await this.userManager.GetRolesAsync(user);

            if (user == null)
            {
                return null;
            }

            var result = new PromoteDemoteUserResponseModel
            {
                Email = user.Email,
                FullName = $"{user.FirstName} {user.LastName}",
                Role = roles,
            };

            return result;
        }
    }
}
