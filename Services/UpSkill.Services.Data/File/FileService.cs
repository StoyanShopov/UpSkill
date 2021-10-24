﻿namespace UpSkill.Services.Data.File
{
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Services.Contracts.Blob;
    using UpSkill.Services.Data.Contracts.File;

    using File = UpSkill.Data.Models.File;

    public class FileService : IFileService
    {
        private readonly IDeletableEntityRepository<File> files;
        private readonly IBlobService blobService;

        public FileService(
            IDeletableEntityRepository<File> files,
            IBlobService blobService)
        {
            this.files = files;
            this.blobService = blobService;
        }

        public async Task<int> CreateAsync(string fileModel)
        {
            using var memoryStream = new MemoryStream();

            var file = await this.blobService.UploadAsync(memoryStream, fileModel);

            var fileObj = await this.files
                .AllAsNoTracking()
                .Where(f => f.FilePath == file)
                .FirstOrDefaultAsync();

            if (fileObj != null)
            {
                return fileObj.Id;
            }

            var dbFile = new File()
            {
                FilePath = file,
            };

            await this.files.AddAsync(dbFile);

            await this.files.SaveChangesAsync();

            return dbFile.Id;
        }

        public async Task<int> EditAsync(int id, string fileModel)
        {
            var file = await this.files
                .All()
                .Where(f => f.Id == id)
                .FirstOrDefaultAsync();

            await this.blobService.DeleteBlobAsync(file.FilePath);

            file.FilePath = fileModel;

            await this.files.SaveChangesAsync();

            using var memoryStream = new MemoryStream();

            var fileObj = await this.CreateAsync(fileModel);

            return fileObj;
        }
    }
}
