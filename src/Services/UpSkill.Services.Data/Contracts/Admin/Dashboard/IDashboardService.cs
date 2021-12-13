namespace UpSkill.Services.Data.Contracts.Admin.Dashboard
{
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Administration.Dashboard;

    public interface IDashboardService
    {
        Task<AggregatedInformationViewModel> GetAggregatedInformationAsync();
    }
}
