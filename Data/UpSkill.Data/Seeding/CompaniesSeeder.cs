namespace UpSkill.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Models;

    using static UpSkill.Common.GlobalConstants.CompaniesNamesConstants;

    internal class CompaniesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var companiesNames = new List<string>()
            {
                MotionCompanyName,
                ScaleFocusCompanyName,
                AdministratorCompanyName
            };


            var companies = new List<Company>();

            foreach (string companyName in companiesNames)
            {
                var newCompany = new Company
                {
                    Name = companyName
                };

                companies.Add(newCompany);
            }

            foreach (Company company in companies)
            {
                var dbCompany = await dbContext.Companies.FirstOrDefaultAsync(x => x.Name == company.Name);

                if(dbCompany == null)
                {
                    await dbContext.Companies.AddAsync(company);
                }               
            }            
        }
    }
}