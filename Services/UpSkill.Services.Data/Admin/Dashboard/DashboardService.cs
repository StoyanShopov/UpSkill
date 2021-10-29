
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
        //private readonly ICompanyService companiesService;
        private readonly IDeletableEntityRepository<Company> companies;        
        private readonly IDeletableEntityRepository<Course> courses;
        private readonly IDeletableEntityRepository<Coach> coaches;

        public DashboardService(IDeletableEntityRepository<Company> companies, IDeletableEntityRepository<Course> courses, IDeletableEntityRepository<Coach> coaches)
        {
            this.companies = companies;
            this.courses = courses;
            this.coaches = coaches;
        }

        public async Task<AggregatedInformationViewModel> GetAggregatedInformationAsync<TAggregatedInformationViewModel>()
        {
            var coursesResult =await this.courses.AllAsNoTracking().ToListAsync();
            var coursesCount = coursesResult.Count();
            var coachesResult =await this.coaches.AllAsNoTracking().ToListAsync();
            var coachesCount = coachesResult.Count();
            var companiesResult = await this.companies.AllAsNoTracking().ToListAsync();
            var companiesCount = companiesResult.Count();
            var revenue = 0;
            var clientsForLastSixMonths = await GetClientsInMonthsAsync<ClientsCountInMonthsViewModel>();

            var aggregatedInformation = new AggregatedInformationViewModel()
            {
                ClientsCount = companiesCount,
                Revenue = revenue,
                CoursesCount = coursesCount,
                CoachesCount = coachesCount,                
                ClientsCountInMonths=clientsForLastSixMonths
            };


            return aggregatedInformation;
        }

        public async Task<IEnumerable<ClientsCountInMonthsViewModel>> GetClientsInMonthsAsync<TClientsCountInMontsViewModel>()
        {
            var lastSixMonths = Enumerable.Range(0, 6).Select(i => DateTime.Now.AddMonths(i - 6).ToString("yyyy/MM/dd"));
            var clientsForEachMonth = new List<ClientsCountInMonthsViewModel>();
            
            foreach (var month in lastSixMonths)
            {                
                var days = DateTime.Now.ToString("dd");
                var thisMonth = DateTime.Parse(month).AddDays(-((int.Parse(days)) - 1));
                var nextMonth =thisMonth.AddDays(30);
                var companies = await this.companies.AllAsNoTrackingWithDeleted().Where(c => (c.CreatedOn <= thisMonth
                || c.CreatedOn <= nextMonth)
                && (c.IsDeleted == false 
                || c.DeletedOn > thisMonth)).ToListAsync();

                var clientsForThisMonth = new ClientsCountInMonthsViewModel
                {
                    ClientsCount = companies.Count(),
                    Month = thisMonth.ToString("MMM")
                };

                clientsForEachMonth.Add(clientsForThisMonth);
            }

            return clientsForEachMonth;
        }
    }
}
