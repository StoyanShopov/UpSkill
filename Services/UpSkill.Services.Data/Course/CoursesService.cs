namespace UpSkill.Services.Data.Course
{
	using System.Threading.Tasks;
	using System.Linq;
	using Microsoft.EntityFrameworkCore;

	using Common;
	using Mapping;
	using Contracts.Course;
	using UpSkill.Data.Common.Repositories;
	using UpSkill.Data.Models;
	using Web.ViewModels.Course;
	using Microsoft.AspNetCore.Identity;

	using static Common.GlobalConstants.CompaniesConstants;
	using static Common.GlobalConstants.RolesNamesConstants;
	using static Common.GlobalConstants.AdminConstants;
	using static Common.GlobalConstants.AccountConstants;
	using UpSkill.Services.Data.Contracts.Company;
	using UpSkill.Data.Common.Models;

	//Coaches table is missing right now so most of the logic is commented
	public class CoursesService : ICoursesService
    {
        private readonly ICompanyService companiesService;
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly IDeletableEntityRepository<Course> courses;

        private readonly UserManager<ApplicationUser> userManager;

        public CoursesService(
            UserManager<ApplicationUser> userManager,
            ICompanyService companiesService,
            IRepository<CompanyCourse> companyCourses,
            IDeletableEntityRepository<Course> courses)
        {
            this.courses = courses;
            this.companiesService = companiesService;
            this.companyCourses = companyCourses;
            this.userManager = userManager;
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

            //TODO
            //The coach table must be added first
            var newCourse = new Course()
            {
                Title = model.Title,
                //CoachFirstName = model.CoachFirstName,
                //CoachLastName = model.CoachLastName,
                Description = model.Description,
                //Price = model.Price,
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
            //course.CoachFirstName = model.CoachFirstName;
            //course.CoachLastName = model.CoachLastName;
            course.Description = model.Description;
            //course.Price = model.Price;
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

		public async Task<Result> AddCompanyAsync(AddCompanyToCourseViewModel model)
		{
            var user = await userManager.FindByEmailAsync(model.CurrentUserEmail);

            if (user == null || !await userManager.IsInRoleAsync(user, AdministratorRoleName))
                return (UserNotAnAdmin);
            
            var companyOwner = await userManager.FindByEmailAsync(model.CompanyOwnerEmail);
            var companyOwnerRoles = await this.userManager.GetRolesAsync(companyOwner);

			if (!companyOwnerRoles.Contains(CompanyOwnerRoleName))
				return UserNotInCompanyOwnerRole;

			var company = await this.companiesService.GetDbModelByIdAsync(model.CompanyId);
			if (company == null)
				return DoesNotExist;

			var course = await this.GetDbModelByIdAsync(model.CourseId);
            if (course == null)
                return DoesNotExist;
            
            var companyCourse = new CompanyCourse
            {
                CompanyId = model.CompanyId,
                CourseId = model.CourseId,
            };

            var companyCourseExist = await companyCourses
                .AllAsNoTracking()
                .Where(cc => cc.CourseId == model.CourseId
                && cc.CompanyId == model.CompanyId)
                .FirstOrDefaultAsync() != null;

            if (companyCourseExist)
                return AlreadyExist;

            await companyCourses.AddAsync(companyCourse);

            await this.companyCourses.SaveChangesAsync();

            return true;
        }

        public async Task<BaseDeletableModel<int>> GetDbModelByIdAsync(int id)
        => await this.courses
            .AllAsNoTracking()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
    }
}
