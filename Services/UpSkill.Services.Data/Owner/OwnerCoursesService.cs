namespace UpSkill.Services.Data.Owner
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
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
        private readonly IDeletableEntityRepository<Course> courses;
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IEmailSender emailSender;

        public OwnerCoursesService(
            UserManager<ApplicationUser> userManager,
            IDeletableEntityRepository<Course> courses,
            IDeletableEntityRepository<Company> companies,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.courses = courses;
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

        public async Task EnableCourse(ChangeCourseAvailabilityViewModel viewModel)
        { }

        public async Task<IEnumerable<TModel>> GetAll<TModel>(GetAllCoursesViewModel viewModel)
        {
            var owner = await this.userManager.FindByIdAsync(viewModel.OwnerId);
            var company = this.companies.All().Where(c => c.Id == owner.CompanyId);
        }
    }
}
