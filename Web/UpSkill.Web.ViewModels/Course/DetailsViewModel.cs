namespace UpSkill.Web.ViewModels.Course
{
    using Data.Models;
    using Services.Mapping;

    public class DetailsViewModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }
    }
}
