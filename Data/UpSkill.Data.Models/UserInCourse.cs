namespace UpSkill.Data.Models
{
    public class UserInCourse
    {
        public string UserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
