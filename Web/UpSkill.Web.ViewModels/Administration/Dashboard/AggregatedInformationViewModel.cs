namespace UpSkill.Web.ViewModels.Administration.Dashboard
{
    using System.Collections.Generic;

    public class AggregatedInformationViewModel
    {
        public int ClientsCount { get; set; }

        public int Revenue { get; set; }

        public int CoursesCount { get; set; }

        public int CoachesCount { get; set; }

        public IEnumerable<ClientsCountInMonthsViewModel> ClientsCountInMonths { get; set; }
    }
}
