
namespace UpSkill.Services.Data.Admin.Dashboard
{
    using System;
    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Company;
    using System.Threading.Tasks;
    using UpSkill.Services.Data.Contracts.Admin.Dashboard;
    using UpSkill.Web.ViewModels.Administration.Dashboard;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using UpSkill.Services.Mapping;
    using System.Collections.Generic;

    public class DashboardService : IDashboardService
    {
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IDeletableEntityRepository<Course> courses;
        private readonly IDeletableEntityRepository<Coach> coaches;

        public DashboardService(IDeletableEntityRepository<Company> companies, IDeletableEntityRepository<Course> courses, IDeletableEntityRepository<Coach> coaches)
        {
            this.companies = companies;
            this.courses = courses;
            this.coaches = coaches;
        }

        public async Task<AggregatedInformationViewModel> GetAggregatedInformationAsync()
        {
            var coursesCount = await this.courses.AllAsNoTracking().CountAsync();
            var coachesCount = await this.coaches.AllAsNoTracking().CountAsync();
            var companiesCount = await this.companies.AllAsNoTracking().CountAsync();
            var revenue = 0;
            var clientsForLastSixMonths = await this.GetClientsInMonthsAsync();

            var aggregatedInformation = new AggregatedInformationViewModel()
            {
                ClientsCount = companiesCount,
                Revenue = revenue,
                CoursesCount = coursesCount,
                CoachesCount = coachesCount,
                ClientsCountInMonths = clientsForLastSixMonths,
            };

            return aggregatedInformation;
        }

        // TODO: Refactor this code
        private async Task<IEnumerable<ClientsCountInMonthsViewModel>> GetClientsInMonthsAsync()
        {
            var firstDayOfThisMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var lastSixMonths = Enumerable.Range(0, 6).Select(i => firstDayOfThisMonth.AddMonths(i - 6).ToString("yyyy/MM/dd")).ToList();
            var clientsForEachMonth = new List<ClientsCountInMonthsViewModel>();
            var startDateOfPreviousSixMonths = DateTime.Parse(lastSixMonths.ToList().First());
            var activeCompanies = await this.companies.AllAsNoTrackingWithDeleted().Where(c => c.IsDeleted == false || c.DeletedOn >= startDateOfPreviousSixMonths).ToListAsync();

            foreach (var month in lastSixMonths)
            {
                var thisMonth = DateTime.Parse(month);
                var nextMonth = thisMonth.AddMonths(1);
                var companiesForThisMonth = activeCompanies.Where(c => (c.CreatedOn <= thisMonth
                 || c.CreatedOn <= nextMonth)
                 && (c.IsDeleted == false
                 || c.DeletedOn > thisMonth));
                var clientsForThisMonth = new ClientsCountInMonthsViewModel
                {
                    ClientsCount = companiesForThisMonth.Count(),
                    Month = thisMonth.ToString("MMM"),
                };

                clientsForEachMonth.Add(clientsForThisMonth);
            }

            return clientsForEachMonth;
        }
    }
}
