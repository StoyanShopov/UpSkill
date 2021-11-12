namespace UpSkill.Web.ViewModels.Coach
{
    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CoachListingModel : IMapFrom<Coach>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Field { get; set; }

        public decimal Price { get; set; }

        public string FileFilePath { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CompanyCoach, CoachListingModel>()
                .ForMember(
                    c => c.Id,
                    c => c.MapFrom(c => c.CoachId));
        }
    }
}
