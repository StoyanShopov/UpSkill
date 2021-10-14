namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    using Common.Models;

    using static UpSkill.Common.GlobalConstants;

    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
            this.Companies = new HashSet<CompanyCourse>();
            this.Users = new HashSet<ApplicationUser>();
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }


        [Column(TypeName = PriceFormat)]
        public decimal Price { get; set; }

        public Category Category { get; set; }

        public int CoachId { get; set; }

        public Coach Coach { get; set; }

        public virtual ICollection<CompanyCourse> Companies { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }

    }
}
