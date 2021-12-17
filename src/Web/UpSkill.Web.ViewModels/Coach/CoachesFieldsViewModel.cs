namespace UpSkill.Web.ViewModels.Coach
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CoachesFieldsViewModel : IMapFrom<Coach>
    {
        public string Field { get; set; }
    }
}
