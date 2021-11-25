namespace UpSkill.Services.Data.Category
{
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Category;

    public class CategoriesService : ICategoriesService
    {
        private readonly IDeletableEntityRepository<Category> categories;

        public CategoriesService(IDeletableEntityRepository<Category> categories)
        {
            this.categories = categories;
        }

        public async Task GetAll()
       => await this.categories
                    .All()
                    .ToListAsync();
    }
}
