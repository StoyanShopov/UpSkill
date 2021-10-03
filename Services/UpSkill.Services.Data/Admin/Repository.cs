namespace UpSkill.Services.Data.Admin
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts;
    using UpSkill.Web.ViewModels.Administration.Courses;

    public class Repository : IRepository
    {
        private readonly IDeletableEntityRepository<Course> courses;

        public Repository(IDeletableEntityRepository<Course> courses)
        {
            this.courses = courses;
        }

        public async Task<string> CreateCourse(CourseFormModel model)
        {
            var newCourse = new Course
            {
                CourseTitle = model.CourseTitle,
                CreatorFirstName = model.CreatorFirstName,
                CreatorLastName = model.CreatorLastName,
                CourseDescription = model.CourseDescription,
                AdditionalInformation = model.AdditionalInformation,
                CourseImage = model.CourseImage,
                CourseCategory = model.CourseCategory,
                CategoryId = model.CategoryId,
                CourseLanguages = model.CourseLanguages,
                PricePerPerson = model.PricePerPerson,
                CreatorCompanyLogo = model.CreatorCompanyLogo
            };

            await courses.AddAsync(newCourse);
            await courses.SaveChangesAsync();

            return "Success";
        }

        public async Task<CourseViewModel> GetCourseById(string id)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return null;
            }

            return new CourseViewModel
            {
                Id = course.Id,
                CourseTitle = course.CourseTitle,
                CreatorFirstName = course.CreatorFirstName,
                CreatorLastName = course.CreatorLastName,
                CourseDescription = course.CourseDescription,
                AdditionalInformation = course.AdditionalInformation,
                CourseImage = course.CourseImage,
                CourseCategory = course.CourseCategory,
                CategoryId = course.CategoryId,
                CourseLanguages = course.CourseLanguages,
                PricePerPerson = course.PricePerPerson,
                CreatorCompanyLogo = course.CreatorCompanyLogo
            };
        }

        public async Task<string> EditCourse(CourseFormModel model, string id)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return null;
            }

            course.CourseTitle = model.CourseTitle;
            course.CreatorFirstName = model.CreatorFirstName;
            course.CreatorLastName = model.CreatorLastName;
            course.CourseDescription = model.CourseDescription;
            course.AdditionalInformation = model.AdditionalInformation;
            course.CourseImage = model.CourseImage;
            course.CourseCategory = model.CourseCategory;
            course.CategoryId = model.CategoryId;
            course.CourseLanguages = model.CourseLanguages;
            course.PricePerPerson = model.PricePerPerson;
            course.CreatorCompanyLogo = model.CreatorCompanyLogo;

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
