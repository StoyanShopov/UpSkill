namespace UpSkill.Web.Areas.Admin
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class AdminController : AdministrationBaseController
    {
        private readonly IAdminService adminService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ILogger<AdminController> logger;

        public AdminController(
            IAdminService adminService,
            UserManager<ApplicationUser> userManager,
            ILogger<AdminController> logger)
        {
            this.adminService = adminService;
            this.userManager = userManager;
            this.logger = logger;
        }

        [HttpPost]
        [Route(AddOwnerCompany)]
        public async Task<IActionResult> AddOwnerToCompany(AddCompanyOwnerRequestModel model, int id)
        {
            this.logger.LogInformation("Entering AddOwnerToCompany (admin)");

            var result = await this.adminService.AddCompanyOwnerToCompanyAsync(model, id);

            if (result.Failure)
            {
                this.logger.LogError(result.Failure.ToString());

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Owner added successfully to company (admin)");

            return this.Ok(SuccesfullyAddedOwnerToGivenCompany);
        }

        [HttpPut]
        [Route(Promote)]
        public async Task<IActionResult> PromoteUser(string email)
        {
            this.logger.LogInformation("Entering PromoteUser (admin)");

            if (!this.ModelState.IsValid)
            {
                this.logger.LogError(this.ModelState.ToString());

                return this.BadRequest(this.ModelState);
            }

            var user = await this.GetUser(email);

            if (user == null)
            {
                this.logger.LogError("User is null (admin)");

                return this.BadRequest(UserNotFound);
            }

            var result = await this.adminService
                            .Promote(user);

            if (result != AssignedSuccessfully)
            {
                this.logger.LogError("User is already promoted (admin)");

                return this.BadRequest(result);
            }
            this.logger.LogError("User promoted successfully (admin)");

            return this.Ok(result);
        }

        [HttpPut]
        [Route(Demote)]
        public async Task<IActionResult> DemoteUser(string email)
        {
            this.logger.LogInformation("Entering DemoteUser (admin)");

            if (!this.ModelState.IsValid)
            {
                this.logger.LogError(this.ModelState.ToString());

                return this.BadRequest(this.ModelState);
            }

            var user = await this.GetUser(email);

            if (user == null)
            {
                this.logger.LogError("User is null (admin)");

                return this.BadRequest(UserNotFound);
            }

            var result = await this.adminService
                           .Demote(user);

            if (result != UnassignedSuccessfully)
            {
                this.logger.LogError("User is already demoted (admin)");

                return this.BadRequest(result);
            }
            this.logger.LogError("User demoted successfully (admin)");

            return this.Ok(result);
        }

        private async Task<ApplicationUser> GetUser(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            return user;
        }
    }
}
