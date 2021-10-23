namespace UpSkill.Web.Areas.Admin.Company
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesController : AdministrationBaseController
    {
        private readonly ICompanyService companyService;

        public CompaniesController(ICompanyService companyService)
            => this.companyService = companyService;

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyRequestModel model)
        {
            var reuslt = await this.companyService.CreateAsync(model);

            if (reuslt.Failure)
            {
                return this.BadRequest(reuslt.Error);
            }

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UpdateCompanyRequestModel model, int id)
        {
            var result = await this.companyService.EditAsync(model, id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.companyService.DeleteAsync(id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CompanyListingModel>> GetAll()
            => await this.companyService.GetAllAsync<CompanyListingModel>();

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CompanyDetailsModel> GetDetails(int id)
            => await this.companyService.GetByIdAsync<CompanyDetailsModel>(id);
    }
}
