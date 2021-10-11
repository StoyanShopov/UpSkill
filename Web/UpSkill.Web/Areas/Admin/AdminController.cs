namespace UpSkill.Web.Areas.Admin
{
    using System.Threading.Tasks; 

    using Microsoft.AspNetCore.Mvc; 

    using UpSkill.Services.Data.Contracts.Admin;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class AdminController : AdministrationBaseController
    {
        private readonly IAdminService adminService;

        public AdminController(IAdminService adminService)
            => this.adminService = adminService;

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
    }
}
