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

        public async Task<Result> CreateAsync(CreateCoachRequestModel model)
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

            var file = await this.fileService.CreateAsync(model.File);

            var coach = new Coach()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Field = model.Field,
                Price = model.Price,
                FileId = file,
                CalendlyUrl = model.CalendlyUrl,
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
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            if (coach == null)
            {
                return DoesNotExist;
            }

            var file = await this.fileService.EditAsync(coach.FileId, model.File);

            coach.FirstName = model.FirstName;
            coach.LastName = model.LastName;
            coach.Field = model.Field;
            coach.Price = model.Price;
            coach.FileId = file;

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
