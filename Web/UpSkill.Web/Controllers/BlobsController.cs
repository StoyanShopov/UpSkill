namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;

    using static UpSkill.Common.GlobalConstants.BlobConstants;
    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class BlobsController : ApiController
    {
        private readonly IBlobService blobService;
        private readonly INLogger nlog;

        public BlobsController(
            IBlobService blobService,
            INLogger nlog)
        {
            this.blobService = blobService;
            this.nlog = nlog;
        }

        [HttpPost(Upload)]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync(IFormFile file)
        {
            var result = await this.blobService.UploadAsync(file);

            if (!this.ModelState.IsValid)
            {
                this.nlog.Error(file, new Exception(this.ModelState.IsValid.ToString()));

                return this.BadRequest();
            }

            this.nlog.Info(this.StatusCode(201).StatusCode.ToString());

            return this.StatusCode(201);
        }

        [HttpGet(GetAllBlobs)]
        public async Task<IActionResult> GetAsync()
        {
            this.nlog.Info("Entering GetAsync action ");

            var blobs = await this.blobService.GetAllBlobs();

            return this.Ok(blobs);
        }

        [HttpGet(DownloadByName)]
        public async Task<IActionResult> DownloadAsync(string name)
        {
            var blob = this.blobService.DownloadBlobByName(name);

            if (!await blob.ExistsAsync())
            {
                this.nlog.Error(name, new Exception(blob.Exists().ToString()));

                return this.BadRequest();
            }

            var response = await blob.DownloadAsync();

            this.nlog.Info("DownloadAsync succeeded ");

            return this.File(response.Value.Content, response.Value.ContentType, name);
        }

        [HttpGet(DeleteRoute)]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var result = await this.blobService.DeleteBlobAsync(name);

            if (result)
            {
                this.nlog.Info(name);

                return this.Ok(SuccessfullyDeleted);
            }

            this.nlog.Error(name, new Exception(UnsuccessfullyDeleted));

            return this.NotFound(UnsuccessfullyDeleted);
        }
    }
}
