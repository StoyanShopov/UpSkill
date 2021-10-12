using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace UpSkill.Services.Blob
{
    using AutoMapper.Configuration;
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;
    using System.IO;
    using System.Threading.Tasks;
    using UpSkill.Services.Contracts.Blob;

    public class UploadService : IUploadService
    {
        private readonly BlobStorage blobStorage;

        public UploadService(IOptions<BlobStorage> configuration)
        {
            this.blobStorage = configuration.Value;
        }

        public async Task<string> UploadAsync(Stream fileStream, string fileName, string contentType)
        {
            var container = new BlobContainerClient(this.blobStorage.BlobKey, this.blobStorage.BlobContainer);

            var createResponse = await container.CreateIfNotExistsAsync();

            if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                await container.SetAccessPolicyAsync(PublicAccessType.Blob);

            var blob = container.GetBlobClient(fileName);

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

            await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

            return blob.Uri.ToString();
        }
    }
}
