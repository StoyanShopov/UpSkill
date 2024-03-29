﻿namespace UpSkill.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Models;

    public class CoachesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var coaches = new List<Coach>()
            {
                new Coach
                {
                    FirstName = "Dow",
                    LastName = "Jones",
                    Field = "C#",
                    FileId = 23,
                    Price = 77,
                    CalendlyUrl = "https://calendly.com/iltodbul-1",
                },
            };

            foreach (Coach coach in coaches)
            {
                var dbCoach = await dbContext.Coaches.FirstOrDefaultAsync(x => x.FirstName == coach.FirstName);

                if (dbCoach == null)
                {
                    await dbContext.Coaches.AddAsync(coach);
                }
            }
        }
    }
}
