namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
     
    using UpSkill.Services.Contracts.Blob;

    using static UpSkill.Common.GlobalConstants.BlobConstants;
    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class BlobsController : ApiController
    {
        private readonly IBlobService blobService;
        private readonly ILogger<BlobsController> logger;

        public BlobsController(
            IBlobService blobService,
            ILogger<BlobsController> logger)
        {
            this.blobService = blobService;
            this.logger = logger;
        }

        [HttpPost(Upload)]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync(IFormFile file)
        {
            this.logger.LogInformation("Entering UploadAsync action ");

            var result = await this.blobService.UploadAsync(file);

            if (!this.ModelState.IsValid)
            {
                this.logger.LogError(this.ModelState.Values.ToString());

                return this.BadRequest();
            }

            this.logger.LogInformation("UploadAsync succeeded");

            return this.StatusCode(201);
        }

        [HttpGet(GetAllBlobs)]
        public async Task<IActionResult> GetAsync()
        {
            this.logger.LogInformation("Entering GetAsync action ");

            var blobs = await this.blobService.GetAllBlobs();

            return this.Ok(blobs);
        }

        [HttpGet(DownloadByName)]
        public async Task<IActionResult> DownloadAsync(string name)
        {
            this.logger.LogInformation("Entering DownloadAsync action ");

            var blob = this.blobService.DownloadBlobByName(name);

            if (!await blob.ExistsAsync())
            {
                this.logger.LogError(blob.ExistsAsync().ToString());

                return this.BadRequest();
            }

            var response = await blob.DownloadAsync();

            this.logger.LogInformation("DownloadAsync succeeded ");

            return this.File(response.Value.Content, response.Value.ContentType, name);
        }

        [HttpGet(DeleteRoute)]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            this.logger.LogInformation("Entering DeleteAsync action ");

            var result = await this.blobService.DeleteBlobAsync(name);

            if (result)
            {
                this.logger.LogInformation("DeleteAsync succeeded ");

                return this.Ok(SuccessfullyDeleted);
            }

            this.logger.LogError(UnsuccessfullyDeleted);

            return this.NotFound(UnsuccessfullyDeleted);
        }
    }
}
