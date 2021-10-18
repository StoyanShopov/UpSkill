namespace UpSkill.Services.Data.Course
{
    using System.Threading.Tasks;
    using System.Linq;

    using Microsoft.EntityFrameworkCore;

    using Common;
    using Mapping;
    using Messaging;
    using Contracts.Course;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using Web.ViewModels.Course;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.UsersEmailsNames;
    using static Common.GlobalConstants.CompaniesConstants;
    using static Common.GlobalConstants.RequestCourseConstants;

    public class CoursesService : ICoursesService
    {
        private readonly IDeletableEntityRepository<Course> courses;
        private readonly IEmailSender emailSender;

        public CoursesService(IDeletableEntityRepository<Course> courses,
             IEmailSender emailSender)
        {
            this.courses = courses;
            this.emailSender = emailSender;
        }

        public async Task<Result> CreateAsync(CreateCourseViewModel model)
        {
            var course = await this.courses
                         .All()
                         .Where(c => c.Title == model.Title)
                         .FirstOrDefaultAsync();

            if (course != null)
            {
                return AlreadyExist;
            }

            var newCourse = new Course()
            {
                Title = model.Title,
                CoachId = model.CoachId,
                Description = model.Description,
                Price = model.Price,
                CategoryId = model.CategoryId
            };

            await this.courses.AddAsync(newCourse);
            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<TModel> GetByIdAsync<TModel>(int id)
        => await this.courses.AllAsNoTracking()
                             .Where(x => x.Id == id)
                             .To<TModel>()
                             .FirstOrDefaultAsync();

        public async Task<Result> EditAsync(EditCourseViewModel model)
        {
            var course = await this.courses
                             .All()
                             .Where(c => c.Id == model.Id)
                             .FirstOrDefaultAsync();

            if (course == null)
            {
                return DoesNotExist;
            }

            course.Title = model.Title;
            course.CoachId = model.CoachId;
            course.Description = model.Description;
            course.Price = model.Price;
            course.CategoryId = model.CategoryId;

            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var course = await this.courses
                         .All()
                         .Where(c => c.Id == id)
                         .FirstOrDefaultAsync();

            if (course == null)
            {
                return DoesNotExist;
            }

            this.courses.Delete(course);
            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task RequestCourseAsync(RequestCourseViewModel model)
        {
            var content = string.Format(HtmlContent,
                                 model.RequesterEmail,
                                 model.RequesterFullName,
                                 model.Description,
                                 model.Category);

            await this.emailSender
                       .SendEmailAsync(model.RequesterEmail,
                                       model.RequesterFullName,
                                       AdministratorEmailName,
                                       NewCourseRequest,
                                       content);
            
        }
    }
}
