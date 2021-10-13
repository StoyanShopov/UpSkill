namespace UpSkill.Services.Blob
{
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;

    using Microsoft.Extensions.Options;

    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Web.ViewModels.Blob;

    public class BlobService : IBlobService
    {
        private readonly BlobStorage blobStorage;

        public BlobService(IOptions<BlobStorage> configuration)
        {
            this.blobStorage = configuration.Value;
        }

        public async Task<string> UploadAsync(Stream fileStream,  string contentType)
        {
            var container = new BlobContainerClient(this.blobStorage.BlobKey, this.blobStorage.BlobContainer);

            var createResponse = await container.CreateIfNotExistsAsync();

            if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                await container.SetAccessPolicyAsync(PublicAccessType.Blob);

            var blob = container.GetBlobClient( Guid.NewGuid().ToString());

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

            await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

            return blob.Uri.ToString();
        }

        public async Task<ICollection<BlobResponseModel>> GetAllBlobs(string blobConnectionString, string blobContainerName)
        {
            var blobs = new List<BlobResponseModel>();

            var container = new BlobContainerClient(blobConnectionString, blobContainerName);

            await foreach (var blobItem in container.GetBlobsAsync())
            {
                var uri = container.Uri.AbsoluteUri;
                var name = blobItem.Name;
                var fullUri = uri + "/" + name;

                blobs.Add(new BlobResponseModel { Name = name, Uri = fullUri, ContentType = blobItem.Properties.ContentType });
            }

            return blobs;
        }
    }
}
