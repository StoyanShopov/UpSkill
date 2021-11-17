namespace UpSkill.Data.Models
{
    public class CourseLecture
    {
        public int CoursesId { get; set; }

        public Course Course { get; set; }

        public int LecturesId { get; set; }

        public Lecture Lecture { get; set; }
    }
}
