namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Coach : BaseDeletableModel<int>
    {
        public Coach()
        {
            this.Courses = new HashSet<Course>();
            this.Companies = new HashSet<CompanyCoach>();
        }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public decimal Price { get; set; }

        public int? FileId { get; set; }

        public File File { get; set; }

        public virtual ICollection<Course> Courses { get; set; }

        public virtual ICollection<CompanyCoach> Companies { get; set; }
    }
}
