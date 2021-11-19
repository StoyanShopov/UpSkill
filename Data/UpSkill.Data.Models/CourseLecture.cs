namespace UpSkill.Data.Models
{
    public class CourseLecture
    {
        public int CourseId { get; set; }

        public Course Course { get; set; }

        public int LectureId { get; set; }

        public Lecture Lecture { get; set; }
    }
}
