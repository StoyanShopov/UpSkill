namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Lecture : BaseDeletableModel<int>
    {
        public Lecture()
        {
            this.Lessons = new HashSet<LectureLesson>();
            this.Courses = new HashSet<CourseLecture>();
        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<LectureLesson> Lessons { get; set; }

        public virtual ICollection<CourseLecture> Courses { get; set; }
    }
}
