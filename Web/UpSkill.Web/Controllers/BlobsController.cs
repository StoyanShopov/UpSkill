using Microsoft.AspNetCore.Authorization;

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

    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class BlobsController : ApiController
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

        [HttpPost(Upload),
         DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();

                if (file.Length > 0)
                {
                    var fileUrl = await this.blobService.UploadAsync(file.OpenReadStream(), file.ContentType);

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

        [HttpGet(GetAllBlobs)]
        public async Task<IActionResult> GetAsync()
        {
            var blobs = await this.blobService.GetAllBlobs(blobConnectionString, blobContainerName);

            return Ok(blobs);
        }

        [HttpGet(DownloadByName)]
        public async Task<IActionResult> DownloadAsync(string name)
        {
            var blob = this.blobService.DownloadBlobByName(name);

            if (!await blob.ExistsAsync()) return BadRequest();
            var response = await blob.DownloadAsync();

            return File(response.Value.Content, response.Value.ContentType, name);

        }

        [HttpGet(DeleteByName)]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var statusCode = await this.blobService.DeleteBlobAsync(name);

            return StatusCode(statusCode);
        }
    }
}
