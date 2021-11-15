namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Web.Infrastructure.Extensions;
    using static UpSkill.Common.GlobalConstants.BlobConstants;
    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;

    [AllowAnonymous]
    public class BlobsController : ApiController
    {
        private readonly IBlobService blobService;

        public BlobsController(IBlobService blobService)
        {
            this.blobService = blobService;
        }

        [HttpPost(Upload)]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAsync(IFormFile file)
        {
            var result = await this.blobService.UploadAsync(file);

            if (!this.ModelState.IsValid)
            {
                NLogExtensions.GetInstance().Error(file,new Exception(this.ModelState.IsValid.ToString()));

                return this.BadRequest();
            }

            NLogExtensions.GetInstance().Info(this.StatusCode(201).StatusCode.ToString());

            return this.StatusCode(201);
        }

        [HttpGet(GetAllBlobs)]
        public async Task<IActionResult> GetAsync()
        {
            NLogExtensions.GetInstance().Info("Entering GetAsync action ");

            var blobs = await this.blobService.GetAllBlobs();

            return this.Ok(blobs);
        }

        [HttpGet(DownloadByName)]
        public async Task<IActionResult> DownloadAsync(string name)
        {
            var blob = this.blobService.DownloadBlobByName(name);

            if (!await blob.ExistsAsync())
            {
                NLogExtensions.GetInstance().Error(name, new Exception(blob.Exists().ToString()));

                return this.BadRequest();
            }

            var response = await blob.DownloadAsync();

            NLogExtensions.GetInstance().Info("DownloadAsync succeeded ");

            return this.File(response.Value.Content, response.Value.ContentType, name);
        }

        [HttpGet(DeleteRoute)]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var result = await this.blobService.DeleteBlobAsync(name);

            if (result)
            {
                NLogExtensions.GetInstance().Info(name);

                return this.Ok(SuccessfullyDeleted);
            }

            NLogExtensions.GetInstance().Error(name, new Exception(UnsuccessfullyDeleted));

            return this.NotFound(UnsuccessfullyDeleted);
        }
    }
}
