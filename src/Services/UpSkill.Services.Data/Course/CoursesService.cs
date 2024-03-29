﻿namespace UpSkill.Services.Data.Course
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using UpSkill.Common;
    using UpSkill.Data.Common.Models;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Company;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Services.Data.Contracts.File;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Course;

    using static Common.GlobalConstants.AccountConstants;
    using static Common.GlobalConstants.AdminConstants;
    using static Common.GlobalConstants.ControllersResponseMessages;
    using static Common.GlobalConstants.RolesNamesConstants;

    public class CoursesService : ICourseService
    {
        private readonly ICompanyService companiesService;
        private readonly IRepository<CompanyCourse> companyCourses;
        private readonly IRepository<UserInCourse> usersInCourses;
        private readonly IRepository<CourseLecture> courseLectures;
        private readonly IDeletableEntityRepository<Course> courses;
        private readonly IFileService fileService;

        private readonly UserManager<ApplicationUser> userManager;

        public CoursesService(
            UserManager<ApplicationUser> userManager,
            ICompanyService companiesService,
            IRepository<CompanyCourse> companyCourses,
            IRepository<UserInCourse> usersInCourses,
            IRepository<CourseLecture> courseLectures,
            IDeletableEntityRepository<Course> courses,
            IFileService fileService)
        {
            this.courses = courses;
            this.companiesService = companiesService;
            this.companyCourses = companyCourses;
            this.usersInCourses = usersInCourses;
            this.courseLectures = courseLectures;
            this.userManager = userManager;
            this.fileService = fileService;
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

            var file = await this.fileService.CreateAsync(model.File);

            var newCourse = new Course()
            {
                Title = model.Title,
                CoachId = model.CoachId,
                Description = model.Description,
                Price = model.Price,
                CategoryId = model.CategoryId,
                FileId = file,
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

        public async Task<Result> EditAsync(EditCourseViewModel model, int id)
        {
            var course = await this.courses
                             .All()
                             .Where(c => c.Id == id)
                             .FirstOrDefaultAsync();

            if (course == null)
            {
                return DoesNotExist;
            }

            if (model.File != null)
            {
                var file = await this.fileService.EditAsync(course.FileId, model.File);
                course.FileId = file;
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

        public async Task<Result> AddCompanyAsync(AddCompanyToCourseViewModel model)
        {
            var companyOwner = await this.userManager.FindByEmailAsync(model.CompanyOwnerEmail);

            if (companyOwner == null)
            {
                return UserNotInCompanyOwnerRole;
            }

            var companyOwnerRoles = await this.userManager.GetRolesAsync(companyOwner);

            if (!companyOwnerRoles.Contains(CompanyOwnerRoleName))
            {
                return UserNotInCompanyOwnerRole;
            }

            var company = await this.companiesService.GetDbModelByIdAsync(companyOwner.CompanyId);
            if (company == null)
            {
                return DoesNotExist;
            }

            var course = await this.GetDbModelByIdAsync(model.CourseId);
            if (course == null)
            {
                return DoesNotExist;
            }

            var companyCourse = new CompanyCourse
            {
                CompanyId = companyOwner.CompanyId,
                CourseId = model.CourseId,
            };

            var companyCourseExist = await this.companyCourses
                .AllAsNoTracking()
                .Where(cc => cc.CourseId == model.CourseId
                && cc.CompanyId == companyOwner.CompanyId)
                .FirstOrDefaultAsync() != null;

            if (companyCourseExist)
            {
                return AlreadyExist;
            }

            await this.companyCourses.AddAsync(companyCourse);

            await this.companyCourses.SaveChangesAsync();

            return true;
        }

        public async Task<BaseDeletableModel<int>> GetDbModelByIdAsync(int id)
        => await this.courses
            .AllAsNoTracking()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        public async Task<ICollection<UserInCourse>> GetAllUsersInCourse(int id) => await this.usersInCourses
              .AllAsNoTracking()
              .Where(uc => uc.CourseId == id)
              .ToListAsync();

        public async Task<IEnumerable<TModel>> GetAllAsync<TModel>()
        => await this.courses
            .AllAsNoTracking()
            .To<TModel>()
            .ToListAsync();

        public async Task<IEnumerable<string>> GetAllCategoriesAsync<TModel>()
            => await this.courses
                .AllAsNoTracking()
                .Include(c => c.Category)
                .Select(x => x.Category.Name)
                .Distinct()
                .ToListAsync();

        public async Task<TModel> GetAggregatedCourseInfoAsync<TModel>(int id)
            => await this.courseLectures
                         .All()
                         .Where(c => c.CourseId == id)
                         .Include(c => c.Lecture.Lessons)
                         .To<TModel>()
                        .FirstOrDefaultAsync();
    }
}
