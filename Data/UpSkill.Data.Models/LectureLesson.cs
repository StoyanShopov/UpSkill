namespace UpSkill.Data.Models
{
    public class LectureLesson
    {
        public int LectureId { get; set; }

        public Lecture Lecture { get; set; }

        public int LessonId { get; set; }

        public Lesson Lesson { get; set; }
    }
}
