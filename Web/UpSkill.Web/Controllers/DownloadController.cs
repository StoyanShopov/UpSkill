namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Threading.Tasks;

    using UpSkill.Services;


    [Route("[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private readonly string blobConnectionString;
        private readonly string blobContainerName;

        public DownloadController(IOptions<BlobStorage> configuration)
        {
            this.blobConnectionString = configuration.Value.BlobKey;
            this.blobContainerName = configuration.Value.BlobContainer;
        }

        [HttpGet("{name}")]
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
