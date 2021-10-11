namespace UpSkill.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using UpSkill.Services.Contracts.Blob;


    [Route("[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IUploadService uploadService;

        public UploadController(IUploadService uploadService)
        {
            this.uploadService = uploadService ?? throw new ArgumentNullException(nameof(uploadService));
        }

        [HttpPost, DisableRequestSizeLimit]
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
    }
}
