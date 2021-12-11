namespace UpSkill.Data.Models
{
    using System.Collections.Generic;

    using UpSkill.Data.Common.Models;

    public class Lesson : BaseDeletableModel<int>
    {
        public Lesson()
        {
            this.Lectures = new HashSet<LectureLesson>();
        }

        public string Url { get; set; }

        public MediaType MediaType { get; set; }

        public virtual ICollection<LectureLesson> Lectures { get; set; }
    }
}
