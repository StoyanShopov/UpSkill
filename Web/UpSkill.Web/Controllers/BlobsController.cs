namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using UpSkill.Services;
    using UpSkill.Services.Contracts.Blob;

    [Route("[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly IBlobService blobService;
        private readonly string blobConnectionString;
        private readonly string blobContainerName;

        public BlobsController(
            IOptions<BlobStorage> configuration,
            IBlobService blobService)
        {
            this.blobConnectionString = configuration.Value.BlobKey;
            this.blobContainerName = configuration.Value.BlobContainer;
            this.blobService = blobService ?? throw new ArgumentNullException(nameof(blobService));
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
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName?.Trim('"');
                    //var fileUrl = await uploadService.UploadAsync(file.OpenReadStream(), fileName, file.ContentType);

                    var fileUrl = await blobService.UploadAsync(file.OpenReadStream(), file.ContentType);

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
        public async Task<IActionResult> GetAsync()
        {
            var blobs = await blobService.GetAllBlobs(blobConnectionString, blobContainerName);

            return Ok(blobs);
        }

        [HttpGet("download/{name}")]
        public async Task<IActionResult> DownloadAsync(string name)
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

        [HttpGet("delete/{name}")]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var container = new BlobContainerClient(this.blobConnectionString, this.blobContainerName); 
            
            var blob = container.GetBlobClient(name);

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

            return StatusCode(202);
        }
    }
}
