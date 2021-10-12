namespace UpSkill.Web.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Blob;

    [Route("[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly string azureConnectionString;
        private readonly string azureContainerName;

        public BlobsController(IConfiguration configuration)
        {
            //this.azureConnectionString = configuration.GetConnectionString("BlobStorage");
            this.azureConnectionString = "DefaultEndpointsProtocol=https;AccountName=titans;AccountKey=FHelA/DscSkmzKJEzdmVo5yADvjXXa9SVC1ol0XpBokFsYjE62CO9UyYpwoDGDTzZfjTX9FPt2VBxljs/lgRKQ==;EndpointSuffix=core.windows.net";
            this.azureContainerName = "titansfirstcontainer";
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var blobs = new List<BlobResponseModel>();

            var container = new BlobContainerClient(this.azureConnectionString, this.azureContainerName);

            await foreach (var blobItem in container.GetBlobsAsync())
            {
                var uri = container.Uri.AbsoluteUri;
                var name = blobItem.Name;
                var fullUri = uri + "/" + name;

                blobs.Add(new BlobResponseModel { Name = name, Uri = fullUri, ContentType = blobItem.Properties.ContentType });
            }

            return Ok(blobs);
        }
    }
}
