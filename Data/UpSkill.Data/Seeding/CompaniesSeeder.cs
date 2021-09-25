using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using UpSkill.Common;
using UpSkill.Data.Models;

namespace UpSkill.Data.Seeding
{
    internal class CompaniesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var companies = new List<Company>
            {
                new Company
                {
                    Name = GlobalConstants.MotionCompanyName
                },
                
                new Company
                {
                    Name = GlobalConstants.ScaleFocusCompanyName
                },

                new Company
                {
                    Name = GlobalConstants.AdministratorCompanyName
                }
            };

            foreach (Company company in companies)
            {
                var dbCompany = await dbContext.Company.FirstOrDefaultAsync(x => x.Name == company.Name);

                if(dbCompany == null)
                {
                    await dbContext.Company.AddAsync(company);
                }               
            }            
        }
    }
}
