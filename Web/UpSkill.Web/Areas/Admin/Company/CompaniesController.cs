namespace UpSkill.Web.Areas.Admin.Company
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesController : AdministrationBaseController
    {
        private readonly ICompanyService companyService;
        private readonly ILogger<CompaniesController> logger;

        public CompaniesController(
            ICompanyService companyService,
            ILogger<CompaniesController> logger)
        {
            this.companyService = companyService;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyRequestModel model)
        {
            this.logger.LogInformation("Entering Create company action (admin)");

            var result = await this.companyService.CreateAsync(model);

            if (result.Failure)
            {
                this.logger.LogError(result.Error.ToString() + " (admin)");
                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Company created  (admin)");

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UpdateCompanyRequestModel model, int id)
        {
            this.logger.LogInformation("Entering Create company action (admin)");

            var result = await this.companyService.EditAsync(model, id);

            if (result.Failure)
            {
                this.logger.LogError(result.Error.ToString() + " (admin)");

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Company edited (admin)");

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            this.logger.LogInformation("Entering Create company action (admin)");

            var result = await this.companyService.DeleteAsync(id);

            if (result.Failure)
            {
                this.logger.LogError(result.Error.ToString() + " (admin)");

                return this.BadRequest(result.Error);
            }

            this.logger.LogInformation("Company deleted (admin)");

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CompanyListingModel>> GetAll()
        {
            this.logger.LogInformation("Entering getAll action (admin)");

            return await this.companyService.GetAllAsync<CompanyListingModel>();
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CompanyDetailsModel> GetDetails(int id)
        {
            this.logger.LogInformation("Entering GetDetails action (admin)");

            return await this.companyService.GetByIdAsync<CompanyDetailsModel>(id);
        }
    }
}
