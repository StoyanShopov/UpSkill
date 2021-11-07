namespace UpSkill.Services.Contracts.Blob
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Azure.Storage.Blobs;

    using Microsoft.AspNetCore.Http;

    using UpSkill.Web.ViewModels.Blob;

    public interface IBlobService
    {
        Task<string> UploadAsync(IFormFile file);

        Task<ICollection<BlobResponseModel>> GetAllBlobs();

        BlobClient DownloadBlobByName(string name);

        Task<bool> DeleteBlobAsync(string name);
    }
}
