namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema; 

    using UpSkill.Data.Common.Models;

    using static UpSkill.Common.GlobalConstants.ColumTypeConstants;

    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
            this.Companies = new HashSet<CompanyCourse>();
        } 

        public string Title { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string Description { get; set; }

        [Column(TypeName = Decimal)]
        public decimal Price { get; set; }

        public int CategoryId { get; set; } 

        public Category Category { get; set; }

        public virtual ICollection<CompanyCourse> Companies { get; set; } 
    }
}
