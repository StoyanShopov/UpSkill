namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using UpSkill.Services.Contracts.Blob;

    using static UpSkill.Common.GlobalConstants.ControllerRoutesConstants;
    using static UpSkill.Common.GlobalConstants.BlobConstants;

    [AllowAnonymous]
    public class BlobsController : ApiController
    {
        private readonly IBlobService blobService;

        public BlobsController(IBlobService blobService)
        {
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
                return StatusCode(500, exception);
            }
        }

        [HttpGet(GetAllBlobs)]
        public async Task<IActionResult> GetAsync()
        {
            var blobs = await this.blobService.GetAllBlobs();

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

        [HttpGet(DeleteRoute)]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var result = await this.blobService.DeleteBlobAsync(name);

            if (result)
                return Ok(SuccessfullyDeleted);

            return NotFound(UnsuccessfullyDeleted);
        }
    }
}
