namespace UpSkill.Services.Data.Tests.Services
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Services.Data.Tests.Common;
    using UpSkill.Data.Models;
    using Xunit;
    using Microsoft.EntityFrameworkCore;

    public class OwnerServiceTest: TestWithData
    {
        [Fact]
        public async Task GetAllCoursesAsyncShouldReturnAllCompanyCourses()
        {
            const string DatabaseName = "GetAllCompanyCourses";
            var companyId = 1;
            var companyCoursesCount = 2;

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IRepository<CompanyCourse>>();

            var companyCourses = await this.Database.CompanyCourses
                .Where(cc => cc.CompanyId == companyId).ToListAsync();

            Assert.NotNull(companyCourses);
            Assert.Equal(companyCoursesCount, companyCourses.Count);
        }

        [Fact]
        public async Task GetAllCoachesAsyncShouldReturnAllCompanyCoaches()
        {
            const string DatabaseName = "GetAllCompanyCoaches";
            var companyId = 1;
            var companyCoachesCount = 2;

            await this.InitializeDatabase(DatabaseName);

            var companyCoaches = await this.Database.CompanyCoaches
                .Where(cc => cc.CompanyId == companyId).ToListAsync();

            Assert.NotNull(companyCoaches);
            Assert.Equal(companyCoachesCount, companyCoaches.Count);
        }
    }
}
