using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UpSkill.Web.ViewModels.Administration.Dashboard
{
    public class AggregatedInformationViewModel
    {
        public int ClientsCount { get; set; }

        public int Revenue { get; set; }

        public int CoursesCount { get; set; }

        public int CoachesCount { get; set; }

        public IEnumerable<ClientsCountInMonthsViewModel> ClientsCountInMonths { get; set; }
    }
}
