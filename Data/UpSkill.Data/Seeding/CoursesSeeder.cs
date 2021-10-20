namespace UpSkill.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Models;

    using static UpSkill.Common.GlobalConstants.CoursesNamesConstants;
    using static UpSkill.Common.GlobalConstants.CoursesDescriptionConstants;

    internal class CoursesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var coursesList = new List<Course>()
            {
                new Course
                {
                    Title = TheoryOfSpecialRelativity,
                    Description = TheoryOfSpecialRelativityDescription,
                    CategoryId = 3,
                    IsDeleted = false
                },
                new Course
                {
                    Title = FinancialAnalysisAndValuationForLawyers,
                    Description = FinancialAnalysisAndValuationForLawyersDescription,
                    CategoryId = 4,
                    IsDeleted = false
                },
                new Course
                {
                    Title = StatisticalPhysics,
                    Description = StatisticalPhysicsDescription,
                    CategoryId = 3,
                    IsDeleted = false
                },
            };

			foreach (Course course in coursesList)
			{
				var dbCourse = await dbContext.Courses.FirstOrDefaultAsync(x => x.Title == course.Title);

				if (dbCourse == null)
				{
					await dbContext.Courses.AddAsync(course);
				}
			}
		}
    }
}
