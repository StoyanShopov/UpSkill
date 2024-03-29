﻿namespace UpSkill.Services.Data.Contracts.Admin
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Administration.Company;

    public interface IAdminService
    {
        Task<Result> AddCompanyOwnerToCompanyAsync(AddCompanyOwnerRequestModel model, int id);

        Task<Result> Promote(string email);

        Task<Result> Demote(string email);
    }
}
