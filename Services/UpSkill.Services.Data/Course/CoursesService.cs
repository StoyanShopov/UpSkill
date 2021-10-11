namespace UpSkill.Services.Data.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Common;
    using Contracts.Course;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using Web.ViewModels.Course;
    public class CoursesService : ICoursesService
    {
        private readonly IDeletableEntityRepository<Course> coursesRepository;

        public CoursesService(IDeletableEntityRepository<Course> coursesRepository)
        {
            this.coursesRepository = coursesRepository;
        }

        public Task<Result> CreateAsync(CreateCourseViewModel model)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result> EditAsync(EditCourseViewModel model)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<TModel>> GetCourseByIdAsync<TModel>(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
