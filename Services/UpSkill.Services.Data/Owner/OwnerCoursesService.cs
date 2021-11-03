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
    using UpSkill.Web.ViewModels.Owner;

    using static Common.GlobalConstants;
    using static Common.GlobalConstants.RequestCourseConstants;
    using static Common.GlobalConstants.UsersEmailsNames;

    public class OwnerCoursesService : IOwnerCoursesService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IRepository<CompanyCourse> companiesCourses;
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IEmailSender emailSender;

        public OwnerCoursesService(
            UserManager<ApplicationUser> userManager,
            IRepository<CompanyCourse> companiesCourses,
            IDeletableEntityRepository<Company> companies,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.companiesCourses = companiesCourses;
            this.companies = companies;
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

        public async Task<Result> EnableCourse(GetOwnerAndCourseByIdViewModel viewModel)
        {
            var user = await this.userManager.FindByIdAsync(viewModel.OwnerId);

            var courseInCompany = await this.companiesCourses
                                             .All()
                                             .Where(c => c.CompanyId == user.CompanyId &&
                                                         c.CourseId == viewModel.CourseId)
                                             .FirstOrDefaultAsync();

            if (courseInCompany == null)
            {
                var companyCourse = new CompanyCourse
                {
                    CompanyId = user.CompanyId,
                    CourseId = viewModel.CourseId,
                };

                await this.companiesCourses.AddAsync(companyCourse);
                await this.companiesCourses.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<Result> DisableCourse(GetOwnerAndCourseByIdViewModel viewModel)
        {
            var user = await this.userManager.FindByIdAsync(viewModel.OwnerId);

            var courseToRemove = await this.companiesCourses
                                           .All()
                                           .Where(c => c.CompanyId == user.CompanyId &&
                                                       c.CourseId == viewModel.CourseId)
                                           .FirstOrDefaultAsync();

            if (courseToRemove != null)
            {
                this.companiesCourses.Delete(courseToRemove);
                await this.companiesCourses.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<IEnumerable<TModel>> GetAll<TModel>()
        => await this.companiesCourses
                     .All()
                     .To<TModel>()
                     .ToListAsync();
    }
}
