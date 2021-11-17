namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Lecture : BaseDeletableModel<int>
    {
        public Lecture()
        {
            this.Lessons = new List<Lesson>();
            this.Courses = new HashSet<CourseLecture>();
        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public List<Lesson> Lessons { get; set; }

        public ICollection<CourseLecture> Courses { get; set; }
    }
}
