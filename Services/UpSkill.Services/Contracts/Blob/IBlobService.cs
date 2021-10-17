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

        Task<ICollection<BlobResponseModel>> GetAllBlobs(string blobConnectionString, string blobContainerName);

        BlobClient DownloadBlobByName(string name);

        Task<int> DeleteBlobAsync(string name);
    }
}
