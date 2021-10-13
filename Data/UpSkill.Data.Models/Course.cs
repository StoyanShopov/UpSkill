namespace UpSkill.Data.Models
{
    using System.Collections.Generic;

    using UpSkill.Data.Common.Models;

    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
            this.Companies = new HashSet<CompanyCourse>();
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public virtual ICollection<CompanyCourse> Companies { get; set; }
    }
}