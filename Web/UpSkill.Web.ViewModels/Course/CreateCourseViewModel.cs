namespace UpSkill.Web.ViewModels.Course
{
    using Microsoft.AspNetCore.Http;

    public class CreateCourseViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CoachId { get; set; }

        public int CategoryId { get; set; }

        public IFormFile File { get; set; }
    }
}
