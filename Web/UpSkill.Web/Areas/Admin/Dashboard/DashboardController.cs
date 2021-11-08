namespace UpSkill.Web.Areas.Admin.Dashboard
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Admin.Dashboard;
    using UpSkill.Web.ViewModels.Administration.Dashboard;

    public class DashboardController : AdministrationBaseController
    {
        private readonly IDashboardService dashboardService;

        public DashboardController(IDashboardService dashboardService)
            => this.dashboardService = dashboardService;

        [HttpGet]
        public async Task<AggregatedInformationViewModel> AggregatedInformation()
            => await this.dashboardService
                     .GetAggregatedInformationAsync();
    }
}
