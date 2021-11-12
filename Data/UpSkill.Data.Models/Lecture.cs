namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Lecture : BaseDeletableModel<int>
    {
        public Lecture()
        {
            this.Lessons = new HashSet<Lesson>();
            this.Courses = new HashSet<Course>();
        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<Lesson> Lessons { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
