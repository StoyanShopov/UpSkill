namespace UpSkill.Services.Data.Coach
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Data.Contracts.Coach;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Coach;

    using static Common.GlobalConstants.ControllersResponseMessages;

    public class CoachesService : ICoachServices
    {
        private readonly IDeletableEntityRepository<Coach> coaches;

        public CoachesService(IDeletableEntityRepository<Coach> coaches)
            => this.coaches = coaches;

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

            var coach = new Coach()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
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

        public async Task<TModel> GetByIdAsync<TModel>(int id)
            => await this.coaches
            .AllAsNoTracking()
            .Where(c => c.Id == id)
            .To<TModel>()
            .FirstOrDefaultAsync();
    }
}
