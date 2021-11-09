namespace UpSkill.Web.ViewModels.Coach
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CoachListingModel : IMapFrom<Coach>
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FileFilePath { get; set; }

        public decimal Price { get; set; }
    }
}
