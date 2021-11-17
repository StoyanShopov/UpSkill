namespace UpSkill.Web.Areas.Admin
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.Infrastructure.Extensions;
    using UpSkill.Web.ViewModels.Administration;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class AdminController : AdministrationBaseController
    {
        private readonly IAdminService adminService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly NLogExtensions nLog;

        public AdminController(
            IAdminService adminService,
            UserManager<ApplicationUser> userManager,
            NLogExtensions nLog)
        {
            this.adminService = adminService;
            this.userManager = userManager;
            this.nLog = nLog;
        }

        [HttpPost]
        [Route(AddOwnerCompany)]
        public async Task<IActionResult> AddOwnerToCompany(AddCompanyOwnerRequestModel model, int id)
        {
            var result = await this.adminService.AddCompanyOwnerToCompanyAsync(model, id);

            if (result.Failure)
            {
                this.nLog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(model);

            return this.Ok(SuccesfullyAddedOwnerToGivenCompany);
        }

        [HttpPut]
        [Route(Promote)]
        public async Task<IActionResult> PromoteUser(string email)
        {
            var result = await this.adminService.Promote(email);

            if (result.Failure)
            {
                this.nLog.Error(email, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(email);

            return this.Ok(AssignedSuccessfully);
        }

        [HttpPut]
        [Route(Demote)]
        public async Task<IActionResult> DemoteUser(string email)
        {
            var result = await this.adminService.Demote(email);

            if (result.Failure)
            {
                this.nLog.Error(email, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nLog.Info(email);

            return this.Ok(UnassignedSuccessfully);
        }

        [HttpGet]
        public async Task<PromoteDemoteUserResponseModel> GetUser(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);
            var roles = await this.userManager.GetRolesAsync(user);

            if (user == null)
            {
                this.nLog.Error(email, new Exception(UserDoNotExist));

                return null;
            }

            var result = new PromoteDemoteUserResponseModel
            {
                Email = user.Email,
                FullName = $"{user.FirstName} {user.LastName}",
                Role = roles,
            };

            this.nLog.Info(result);

            return result;
        }
    }
}
