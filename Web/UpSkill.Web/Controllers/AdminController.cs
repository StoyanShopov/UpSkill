namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks; 

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts;
    using UpSkill.Web.ViewModels.Administration.Company;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.RolesNamesConstants;
    using static Common.GlobalConstants.CompaniesConstants;

    [Authorize(Roles = AdministratorRoleName)]
    public class AdminController : ApiController
    {
        private readonly IAdminUsersService adminService;

        public AdminController(IAdminUsersService adminService) 
            => this.adminService = adminService; 

        [HttpPost] 
        [Route(Create)] 
        public async Task<IActionResult> CreateCompany(InputRequestModel model)
        {
            var result = await this.adminService.CreateAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return StatusCode(201, SuccesfullyCreated); 
        } 

        [HttpPut] 
        [Route(Edit)] 
        public async Task<IActionResult> EditCompany(UpdateRequestModel model)
        {
            var result = await this.adminService.EditAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok(SuccesfullyEdited); 
        }  

        [HttpDelete] 
        [Route(Delete)]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var result = await this.adminService.DeleteAsync(id);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok(SuccesfullyDeleted); 
        } 

        [HttpPost]
        [Route(AddOwner)]
        public async Task<IActionResult> AddOwnerToCompany(AddCompanyOwnerRequestModel model, int id)
        {
            var result = await this.adminService.AddCompanyOwenerToCompanyAsync(model, id);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok(SuccesfullyAddedOwnerToGivenCompany);
        }
    }
}
