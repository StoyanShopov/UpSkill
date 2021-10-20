namespace UpSkill.Services.Data.Company
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Models;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Company;

    using static Common.GlobalConstants.CompaniesConstants;

    public class CompaniesService : ICompanyService
    {
        private readonly IDeletableEntityRepository<Company> companies;

        public CompaniesService(IDeletableEntityRepository<Company> companies)
            => this.companies = companies;

        public async Task<Result> CreateAsync(CreateCompanyRequestModel model)
        {
            var companyObj = await this.companies
                 .AllAsNoTracking()
                 .FirstOrDefaultAsync(c => c.Name == model.Name);

            if (companyObj != null)
            {
                return AlreadyExist;
            }

            var company = new Company()
            {
                Name = model.Name,
            };

            await this.companies.AddAsync(company);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<Result> EditAsync(UpdateCompanyRequestModel model, int id)
        {
            var company = await this.companies
             .All()
             .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
            {
                return DoesNotExist;
            }

            company.Name = model.Name;

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var company = await this.companies
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
            {
                return DoesNotExist;
            }

            this.companies.Delete(company);

            await this.companies.SaveChangesAsync();

            return true;
        }

        public async Task<TModel> GetByIdAsync<TModel>(int id)
            => await this.companies
                .AllAsNoTracking()
                .Include(c => c.Users)
                .Include(c => c.Courses)
                .Where(c => c.Id == id)
                .To<TModel>()
                .FirstOrDefaultAsync();

        public async Task<IEnumerable<TModel>> GetAllAsync<TModel>()
            => await this.companies
                .AllAsNoTracking()
                .To<TModel>()
                .ToListAsync();

        public async Task<BaseDeletableModel<int>> GetDbModelByIdAsync(int id)
            => await this.companies
                .AllAsNoTracking()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
    }
}
