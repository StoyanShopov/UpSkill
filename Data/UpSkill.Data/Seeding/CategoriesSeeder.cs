namespace UpSkill.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Models;

    using static UpSkill.Common.GlobalConstants.CategoriesNamesConstants;

    internal class CategoriesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var categoriesList = new List<Category>()
            {
                new Category
                {
                    Name = Physics,
                    DeletedOn = null,
                    IsDeleted = false,
                },
                new Category
                {
                    Name = Finance,
                    DeletedOn = null,
                    IsDeleted = false,
                },
            };

            foreach (Category category in categoriesList)
            {
                var dbCategory = await dbContext.Categories
                                                .FirstOrDefaultAsync(x => x.Name == category.Name);

                if (dbCategory == null)
                {
                    await dbContext.Categories.AddAsync(category);
                }
            }
        }
    }
}
