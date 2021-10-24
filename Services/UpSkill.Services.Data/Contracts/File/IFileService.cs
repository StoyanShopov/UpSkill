namespace UpSkill.Services.Data.Contracts.File
{
    using System.Threading.Tasks;

    public interface IFileService
    {
        Task<int> UploadFileAsync(string fileModel);
    }
}
