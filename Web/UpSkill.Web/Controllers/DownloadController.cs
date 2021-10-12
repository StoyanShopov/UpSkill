namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System.Threading.Tasks;

    [Route("[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private readonly string azureConnectionString;
        private readonly string azureContainerName;

        public DownloadController(IConfiguration configuration)
        {
            //this.azureConnectionString = configuration.GetConnectionString("BlobStorage");
            this.azureConnectionString = "DefaultEndpointsProtocol=https;AccountName=titans;AccountKey=FHelA/DscSkmzKJEzdmVo5yADvjXXa9SVC1ol0XpBokFsYjE62CO9UyYpwoDGDTzZfjTX9FPt2VBxljs/lgRKQ==;EndpointSuffix=core.windows.net";
            this.azureContainerName = "titansfirstcontainer";
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Download(string name)
        {
            var container = new BlobContainerClient(this.azureConnectionString, this.azureContainerName);

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
