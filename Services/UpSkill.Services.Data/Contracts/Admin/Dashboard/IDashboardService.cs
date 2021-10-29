using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpSkill.Common;
using UpSkill.Web.ViewModels.Administration.Dashboard;

namespace UpSkill.Services.Data.Contracts.Admin.Dashboard
{
    public interface IDashboardService
    {
        Task<AggregatedInformationViewModel> GetAggregatedInformationAsync<TAggregatedInformationViewModel>();
        Task<IEnumerable<ClientsCountInMonthsViewModel>> GetClientsInMonthsAsync<TClientsCountInMontsViewModel>();
    }
}
