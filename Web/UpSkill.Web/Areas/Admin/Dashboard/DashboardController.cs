using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpSkill.Services.Data.Contracts.Admin.Dashboard;
using UpSkill.Web.ViewModels.Administration.Dashboard;

namespace UpSkill.Web.Areas.Admin.Dashboard
{
    public class DashboardController : AdministrationBaseController
    {
        private readonly IDashboardService dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<AggregatedInformationViewModel> AggregatedInformation()
        => await this.dashboardService
                     .GetAggregatedInformationAsync<AggregatedInformationViewModel>();
    }
}
