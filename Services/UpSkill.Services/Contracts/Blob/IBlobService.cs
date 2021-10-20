namespace UpSkill.Services.Contracts.Blob
{

    using Azure.Storage.Blobs;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Blob;

    public interface IBlobService
    {
        Task<string> UploadAsync(Stream fileStream,  string contentType);

        Task<ICollection<BlobResponseModel>> GetAllBlobs();

        BlobClient DownloadBlobByName(string name);

        Task<bool> DeleteBlobAsync(string name);
    }
}
