namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
            this.Companies = new HashSet<CompanyCourse>();
            this.Users = new HashSet<UserInCourse>();
        }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public decimal Price { get; set; }

        public Category Category { get; set; }

        public int CoachId { get; set; }

        public Coach Coach { get; set; }

        public int? FileId { get; set; }

        public File File { get; set; }

        public virtual ICollection<CompanyCourse> Companies { get; set; }

        public ICollection<UserInCourse> Users { get; set; }
    }
}
