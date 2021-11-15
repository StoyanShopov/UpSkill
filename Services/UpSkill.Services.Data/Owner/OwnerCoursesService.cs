namespace UpSkill.Services.Data.Owner
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Owner;
    using UpSkill.Services.Mapping;
    using UpSkill.Services.Messaging;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.RequestCourseConstants;
    using static Common.GlobalConstants.UsersEmailsNames;

    public class OwnerCoursesService : IOwnerCoursesService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IRepository<CompanyCourse> companiesCourses;
        private readonly IRepository<Course> courses;
        private readonly IEmailSender emailSender;

        public OwnerCoursesService(
            UserManager<ApplicationUser> userManager,
            IRepository<CompanyCourse> companiesCourses,
            IRepository<Course> courses,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.companiesCourses = companiesCourses;
            this.courses = courses;
            this.emailSender = emailSender;
        }

        public async Task RequestCourseAsync(RequestCourseViewModel model)
        {
            var content = string.Format(
                                        HtmlContent,
                                        model.RequesterEmail,
                                        model.RequesterFullName,
                                        model.Description,
                                        model.Category);

            // You can use your own email.
            await this.emailSender.SendEmailAsync(
                                       model.RequesterEmail,
                                       model.RequesterFullName,
                                       AdministratorEmailName,
                                       NewCourseRequest,
                                       content);
        }

        public async Task<Result> EnableCourseAsync(int courseId, string userId)
        {
            var user = await this.GetUser(userId);

            var courseInCompany = await this.companiesCourses
                                             .All()
                                             .Where(c => c.CompanyId == user.CompanyId &&
                                                         c.CourseId == courseId)
                                             .FirstOrDefaultAsync();

            if (courseInCompany == null)
            {
                var companyCourse = new CompanyCourse
                {
                    CompanyId = user.CompanyId,
                    CourseId = courseId,
                };

                await this.companiesCourses.AddAsync(companyCourse);
                await this.companiesCourses.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<Result> DisableCourseAsync(int courseId, string userId)
        {
            var user = await this.GetUser(userId);

            var courseToRemove = await this.companiesCourses
                                           .All()
                                           .Where(c => c.CompanyId == user.CompanyId &&
                                                       c.CourseId == courseId)
                                           .FirstOrDefaultAsync();

            if (courseToRemove != null)
            {
                this.companiesCourses.Delete(courseToRemove);
                await this.companiesCourses.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<IEnumerable<TModel>> GetActiveCoursesAsync<TModel>(string id)
        {
            var user = await this.GetUser(id);

            return await this.companiesCourses
                            .All()
                            .Where(c => c.CompanyId == user.CompanyId)
                            .To<TModel>()
                            .ToListAsync();
        }

        public async Task<IEnumerable<TModel>> GetAvailableCoursesAsync<TModel>(string id)
        {
            var user = await this.GetUser(id);
            return await this.courses
                            .All()
                            .SelectMany(x => x.Companies)
                            .Where(x => x.CompanyId != user.CompanyId)
                            .To<TModel>()
                            .ToListAsync();

        }

        private async Task<ApplicationUser> GetUser(string id)
        => await this.userManager.FindByIdAsync(id);
    }
}
