namespace UpSkill.Services.Data.Contracts.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Common;
    using Web.ViewModels.Course;
    using AutoMapper;
    using Mapping;
    using UpSkill.Data.Models;


    public interface ICoursesService
    {
        Task<Result> CreateAsync(CreateCourseViewModel model);

        Task<Result> EditAsync(EditCourseViewModel model);

        Task<Result> DeleteAsync(int id);

        Course GetDetailsForCourse(int id);

    }
}
