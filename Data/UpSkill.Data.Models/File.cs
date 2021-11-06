namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class File : BaseDeletableModel<int>
    {
        public File()
        {
            this.Coaches = new HashSet<Coach>();
            this.Courses = new HashSet<Course>();
        }

        [Required]
        public string FilePath { get; set; }

        public virtual ICollection<Coach> Coaches { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
