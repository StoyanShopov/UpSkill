namespace UpSkill.Services.Data.Contracts.File
{
    using System.Threading.Tasks;

    public interface IFileService
    {
        Task<int> CreateAsync(string fileModel);

        Task<int> EditAsync(int id, string fileModel);
    }
}
