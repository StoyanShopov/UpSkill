namespace UpSkill.Web.ViewModels.Coach
{
    using AutoMapper;
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class OwnerCoachesListingModel : IMapFrom<Coach>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string CoachFirstName { get; set; }

        public decimal CoachPrice { get; set; }

        public string CoachLastName { get; set; }

        public string CoachFileFilePath { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CompanyCoaches, OwnerCoachesListingModel>()
               .ForMember(
               c => c.Id,
               c => c.MapFrom(c => c.CoachId));
        }
    }
}
