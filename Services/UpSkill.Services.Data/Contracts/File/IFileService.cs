namespace UpSkill.Services.Data.Contracts.File
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;

    public interface IFileService
    {
        Task<int> CreateAsync(IFormFile fileModel);

        Task<int> EditAsync(int? id, IFormFile fileModel);
    }
}
