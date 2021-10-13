namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Services;
    using UpSkill.Web.ViewModels.Blob;

    [Route("[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly string blobConnectionString;
        private readonly string blobContainerName;

        public BlobsController(IOptions<BlobStorage> configuration)
        {
            this.blobConnectionString = configuration.Value.BlobKey;
            this.blobContainerName = configuration.Value.BlobContainer;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var blobs = new List<BlobResponseModel>();

            var container = new BlobContainerClient(this.blobConnectionString, this.blobContainerName);

            await foreach (var blobItem in container.GetBlobsAsync())
            {
                var uri = container.Uri.AbsoluteUri;
                var name = blobItem.Name;
                var fullUri = uri + "/" + name;

                blobs.Add(new BlobResponseModel { Name = name, Uri = fullUri, ContentType = blobItem.Properties.ContentType });
            }

            return Ok(blobs);
        }
    }
}
