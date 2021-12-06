namespace UpSkill.Web.ViewModels.Course
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class AdminCoursesDetailsViewModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string CategoryName { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string FileFilePath { get; set; }
    }
}
