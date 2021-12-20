namespace UpSkill.Web.Areas.Admin.Company
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CompaniesController : AdministrationBaseController
    {
        private readonly ICompanyService companyService;
        private readonly INLogger nlog;

        public CompaniesController(
            ICompanyService companyService,
            INLogger nlog)
        {
            this.companyService = companyService;
            this.nlog = nlog;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyRequestModel model)
        {
            var result = await this.companyService.CreateAsync(model);

            if (result.Failure)
            {
                this.nlog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info(model);

            return this.StatusCode(201, SuccesfullyCreated);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UpdateCompanyRequestModel model, int id)
        {
            var result = await this.companyService.EditAsync(model, id);

            if (result.Failure)
            {
                this.nlog.Error(model, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info(model);

            return this.Ok(SuccesfullyEdited);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.companyService.DeleteAsync(id);

            if (result.Failure)
            {
                this.nlog.Error(id, new Exception(result.Error));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info(id);

            return this.Ok(SuccesfullyDeleted);
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CompanyListingModel>> GetAll()
        {
            this.nlog.Info("Entering getAll action");

            return await this.companyService.GetAllAsync<CompanyListingModel>();
        }

        [HttpGet]
        [Route(DetailsRoute)]
        public async Task<CompanyDetailsModel> GetDetails(int id)
        {
            this.nlog.Info("Entering GetDetails action");

            return await this.companyService.GetByIdAsync<CompanyDetailsModel>(id);
        }

        [HttpGet]
        [Route(GetCompanyEmailRoute)]
        public async Task<List<CompanyEmailViewModel>> GetCompanyEmail()
        {
            this.nlog.Info("Entering GetCompanyEmail action");

            var companiesEmails = await this.companyService.GetCompanyEmailAsync();

            var viewModels = new List<CompanyEmailViewModel>();

            for (int i = 0; i < companiesEmails.Count; i++)
            {
                viewModels.Add(new CompanyEmailViewModel()
                {
                    Name = companiesEmails[i].Company.Name,
                    Email = companiesEmails[i].Email,
                });

            }

            return viewModels;
        }
    }
}
