namespace UpSkill.Web.Areas.Admin.Company
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using NLog;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesController : AdministrationBaseController
    {
        private static Logger logger = LogManager.GetLogger("UpSkillLoggerRules");
        private readonly ICompanyService companyService;

        public CompaniesController(ICompanyService companyService)
            => this.companyService = companyService;

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyRequestModel model)
        {
            logger.Info("Entering companies controller. Create company method! (admin)");

            var reuslt = await this.companyService.CreateAsync(model);

            if (reuslt.Failure)
            {
                logger.Warn("Create company method failed! (admin)");
                return this.BadRequest(reuslt.Error);
            }

            logger.Info("Company created! (admin)");
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
