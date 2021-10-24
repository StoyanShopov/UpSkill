namespace UpSkill.Services.Data.Coach
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Services.Data.Contracts.File;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesService : ICoachServices
    {
        private readonly IDeletableEntityRepository<Coach> coaches;
        private readonly IFileService fileService;

        public CoachesService(
            IDeletableEntityRepository<Coach> coaches,
            IFileService fileService)
        {
            this.coaches = coaches;
            this.fileService = fileService;
        }

        public async Task<Result> CreateAsync(CreateCoachRequestModel model, string fileModel)
        {
            var coachObj = await this.coaches
                .AllAsNoTracking()
                .FirstOrDefaultAsync(
                c => c.FirstName == model.FirstName
                && c.LastName == model.LastName);

            if (coachObj != null)
            {
                return AlreadyExist;
            }

            var file = await this.fileService.UploadFileAsync(fileModel);

            var coach = new Coach()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                FileId = file,
            };

            await this.coaches.AddAsync(coach);

            await this.coaches.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var coach = await this.coaches
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (coach == null)
            {
                return DoesNotExist;
            }

            this.coaches.Delete(coach);

            await this.coaches.SaveChangesAsync();

            return true;
        }

        public async Task<Result> EditAsync(UpdateCoachRequestMode model, int id)
        {
            var coach = await this.coaches
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (coach == null)
            {
                return DoesNotExist;
            }

            coach.FirstName = model.FirstName;
            coach.LastName = model.LastName;

            await this.coaches.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<TModel>> GetAllAsync<TModel>()
            => await this.coaches
            .AllAsNoTracking()
            .To<TModel>()
            .ToListAsync();

        public async Task<TModel> GetByIdAsync<TModel>(int id)
            => await this.coaches
            .AllAsNoTracking()
            .Where(c => c.Id == id)
            .To<TModel>()
            .FirstOrDefaultAsync();
    }
}
