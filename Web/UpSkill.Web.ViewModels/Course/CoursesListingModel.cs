namespace UpSkill.Web.ViewModels.Course
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CoursesListingModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int CategoryId { get; set; }

        public decimal Price { get; set; }

        public int CoachId { get; set; }
    }
}
