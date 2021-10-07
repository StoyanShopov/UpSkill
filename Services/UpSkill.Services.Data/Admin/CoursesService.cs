namespace UpSkill.Services.Data.Admin
{
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts;
    using UpSkill.Web.ViewModels.Administration.Courses;

    public class CoursesService : ICoursesService
    {
        private readonly IDeletableEntityRepository<Course> courses;

        public CoursesService(IDeletableEntityRepository<Course> courses)
        {
            this.courses = courses;
        }

        public async Task<string> CreateCourse(CourseInputModel model)
        {
            var newCourse = new Course
            {
                Title = model.Title,
                CreatorFirstName = model.CreatorFirstName,
                CreatorLastName = model.CreatorLastName,
                Description = model.Description,
                AdditionalInformation = model.AdditionalInformation,
                Price = model.Price,
                CategoryId = model.CategoryId,
                Category = model.Category,
                Languages = model.Languages
                //CourseImage = model.Image,
                //CreatorCompanyLogo = model.CreatorCompanyLogo,
            };

            await courses.AddAsync(newCourse);
            await courses.SaveChangesAsync();

            return "Success";
        }

        public async Task<CourseViewModel> GetCourseById(string id)
        {
            var course = await this.courses
                .AllAsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return null;
            }

            return new CourseViewModel
            {
                Id = course.Id,
                Title = course.Title,
                CreatorFirstName = course.CreatorFirstName,
                CreatorLastName = course.CreatorLastName,
                Description = course.Description,
                AdditionalInformation = course.AdditionalInformation,
                Price = course.Price,
                Category = course.Category,
                CategoryId = course.CategoryId,
                Languages = course.Languages
                //CreatorCompanyLogo = course.CreatorCompanyLogo
                //Image = course.Image,
            };
        }

        public async Task<string> EditCourse(CourseInputModel model, string id)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return null;
            }

            course.Title = model.Title;
            course.CreatorFirstName = model.CreatorFirstName;
            course.CreatorLastName = model.CreatorLastName;
            course.Description = model.Description;
            course.AdditionalInformation = model.AdditionalInformation;
            course.Price = model.Price;
            course.CategoryId = model.CategoryId;
            course.Category = model.Category;
            course.Languages = model.Languages;

            //course.CreatorCompanyLogo = model.CreatorCompanyLogo;
            //course.Image = model.Image;

            await this.courses.SaveChangesAsync();

            return "Success";
        }

        public async Task<string> DeleteCourse(string id)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return null;
            }

            this.courses.Delete(course);
            await this.courses.SaveChangesAsync();

            return "Success";
        }
    }
}
