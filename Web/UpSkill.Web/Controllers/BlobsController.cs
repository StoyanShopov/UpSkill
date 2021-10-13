namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    using UpSkill.Services;
    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Web.ViewModels.Blob;

    [Route("[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly IBlobService uploadService;
        private readonly string blobConnectionString;
        private readonly string blobContainerName;

        public BlobsController(
            IOptions<BlobStorage> configuration, 
            IBlobService uploadService)
        {
            this.blobConnectionString = configuration.Value.BlobKey;
            this.blobContainerName = configuration.Value.BlobContainer;
            this.uploadService = uploadService ?? throw new ArgumentNullException(nameof(uploadService));
        }

        [HttpPost("upload"),
         DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName?.Trim('"');

                    var fileUrl = await uploadService.UploadAsync(file.OpenReadStream(), fileName, file.ContentType);

                    return Ok(new { fileUrl });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception exception)
            {
                return StatusCode(500, $"Internal server error: {exception}");
            }
        }

        [HttpGet("catalog")]
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

        [HttpGet("download/{name}")]
        public async Task<IActionResult> Download(string name)
        {
            var container = new BlobContainerClient(this.blobConnectionString, this.blobContainerName);

            var blob = container.GetBlobClient(name);

            if (await blob.ExistsAsync())
            {
                var response = await blob.DownloadAsync();

                return File(response.Value.Content, response.Value.ContentType, name);
            }

            return BadRequest();
        }
    }
}
