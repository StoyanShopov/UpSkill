namespace UpSkill.Web.Areas.Admin.Company
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.ControllerRoutesConstants;

    public class CompaniesController : AdministrationBaseController
    {
        private readonly ICompanyService companyService;

        public CompaniesController(ICompanyService companyService)
            => this.companyService = companyService; 

        [HttpPost]
        [Route(CreateCompany)]
        public async Task<IActionResult> Create(CreateCompanyRequestModel model)
        {
            var reuslt = await this.companyService.CreateAsync(model);

            if (reuslt.Failure)
            {
                return BadRequest(reuslt.Error); 
            }

            return StatusCode(201, SuccesfullyCreated);
        } 

        [HttpPut] 
        [Route(EditCompany)]
        public async Task<IActionResult> Edit(UpdateCompanyRequestModel model)
        {
            var result = await this.companyService.EditAsync(model);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok(SuccesfullyEdited);
        } 

        [HttpDelete]  
        [Route(DeleteCompany)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.companyService.DeleteAsync(id);

            if (result.Failure)
            {
                return BadRequest(result.Error); 
            }

            return Ok(SuccesfullyDeleted); 
        }

        [HttpGet]
        [Route(Companies)]
        public async Task<IEnumerable<CompanyListingModel>> GetAll()
            => await this.companyService.GetAllAsync<CompanyListingModel>();

        [HttpGet]
        [Route(Details)]
        public async Task<CompanyDetailsModel> GetDetails(int id)
            => await this.companyService.GetCompanyDetailsByIdAsync<CompanyDetailsModel>(id);
    }
}
