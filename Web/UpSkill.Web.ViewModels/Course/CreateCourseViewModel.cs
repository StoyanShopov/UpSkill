namespace UpSkill.Web.ViewModels.Course
{
    //TODO
    //Fix the category prop with dropdown/ etc..
    public class CreateCourseViewModel
    {
        public string Title { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }
    }
}
