namespace UpSkill.Services.Data.Category
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Category;
    using UpSkill.Services.Mapping;

    public class CategoriesService : ICategoriesService
    {
        private readonly IDeletableEntityRepository<Category> categories;

        public CategoriesService(IDeletableEntityRepository<Category> categories)
        {
            this.categories = categories;
        }

        public async Task<IEnumerable<TModel>> GetAllAsync<TModel>()
       => await this.categories
            .AllAsNoTracking()
            .To<TModel>()
            .ToListAsync();
    }
}
