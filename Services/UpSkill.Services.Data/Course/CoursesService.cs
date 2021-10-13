namespace UpSkill.Services.Data.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Linq;

    using Microsoft.EntityFrameworkCore;

    using Common;
    using Mapping;
    using Contracts.Course;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using Web.ViewModels.Course;

    using static Common.GlobalConstants.CompaniesConstants;

    public class CoursesService : ICoursesService
    {
        private readonly IDeletableEntityRepository<Course> courses;

        public CoursesService(IDeletableEntityRepository<Course> courses)
        {
            this.courses = courses;
        }

        public async Task<Result> CreateAsync(CreateCourseViewModel model)
        {
            var course = await GetCourse(0, model.Title);

            if (course != null)
            {
                return AlreadyExist;
            }

            var newCourse = new Course()
            {
                Title = model.Title,
                CoachFirstName = model.CoachFirstName,
                CoachLastName = model.CoachLastName,
                Description = model.Description,
                Price = model.Price,
                CategoryId = model.CategoryId
            };

            await this.courses.AddAsync(newCourse);
            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<TModel> GetByIdAsync<TModel>(int id)
        {
            var course = await this.courses
                             .AllAsNoTracking()
                             .Where(x => x.Id == id)
                             .To<TModel>()
                             .FirstOrDefaultAsync();

            return course;
        }
        public async Task<Result> EditAsync(EditCourseViewModel model)
        {
            var course = await GetCourse(model.Id, "");

            if (course == null)
            {
                return DoesNotExist;
            }

            course.Title = model.Title;
            course.CoachFirstName = model.CoachFirstName;
            course.CoachLastName = model.CoachLastName;
            course.Description = model.Description;
            course.Price = model.Price;
            course.CategoryId = model.CategoryId;

            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var course = await GetCourse(id, "");

            if (course == null)
            {
                return DoesNotExist;
            }

            this.courses.Delete(course);
            await this.courses.SaveChangesAsync();

            return true;
        }

        private async Task<Course> GetCourse(int? id, string title)
        {
            var course = await this.courses
                             .All()
                             .Where(c => c.Title == title || c.Id == id)
                             .FirstOrDefaultAsync();

            return course;
        }

    }
}
