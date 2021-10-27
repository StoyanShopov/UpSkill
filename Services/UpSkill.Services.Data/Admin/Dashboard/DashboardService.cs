
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

    public class DashboardService : IDashboardService
    {
        //private readonly ICompanyService companiesService;
        private readonly IRepository<Company> companies;
        private readonly IRepository<Course> courses;
        private readonly IRepository<Coach> coaches;

        public DashboardService(IRepository<Company> companies, IRepository<Course> courses, IRepository<Coach> coaches)
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

            var aggregatedInformation = new AggregatedInformationViewModel()
            {
                ClientsCount = companiesCount,
                Revenue = revenue,
                CoursesCount = coursesCount,
                CoachesCount = coachesCount,
            };


            return aggregatedInformation;
        }
        
    }
}
