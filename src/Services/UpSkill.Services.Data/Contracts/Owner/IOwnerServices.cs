﻿namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Owner;

    public interface IOwnerServices
    {
        Task<IEnumerable<TModel>> GetAllCoursesAsync<TModel>(string userId);

        Task<IEnumerable<TModel>> GetAllCoachesAsync<TModel>(string userId);

        Task<Result> AddCoachAsync(AddCoachToCompanyModel model);

        Task RequestCoachAsync(RequestCoachModel model);

        Task<Result> RemoveCoachAsync(int coachId, string userId);
    }
}
