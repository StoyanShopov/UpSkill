namespace UpSkill.Data.Models
{
    public class LectureLesson
    {
        public int LecturesId { get; set; }

        public Lecture Lecture { get; set; }

        public int LessonsId { get; set; }

        public Lesson Lesson { get; set; }
    }
}
