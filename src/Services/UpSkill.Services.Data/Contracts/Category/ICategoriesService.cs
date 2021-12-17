namespace UpSkill.Services.Data.Contracts.Category
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<TModel>> GetAllAsync<TModel>();
    }
}
