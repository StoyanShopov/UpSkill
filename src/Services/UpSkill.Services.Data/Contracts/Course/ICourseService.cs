﻿namespace UpSkill.Services.Data.Contracts.Course
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Common.Models;
    using UpSkill.Web.ViewModels.Course;

    public interface ICourseService
    {
        Task<Result> CreateAsync(CreateCourseViewModel model);

        Task<Result> EditAsync(EditCourseViewModel model, int id);

        Task<Result> DeleteAsync(int id);

        Task<Result> AddCompanyAsync(AddCompanyToCourseViewModel model);

        Task<TModel> GetByIdAsync<TModel>(int id);

        Task<BaseDeletableModel<int>> GetDbModelByIdAsync(int id);

        Task<IEnumerable<TModel>> GetAllAsync<TModel>();

        Task<IEnumerable<string>> GetAllCategoriesAsync<TModel>();

        Task<TModel> GetAggregatedCourseInfoAsync<TModel>(int id);
    }
}
