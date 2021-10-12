namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Company : BaseDeletableModel<int>
    {
        public Company()
        {
            this.Users = new HashSet<ApplicationUser>();
            this.Courses = new HashSet<CompanyCourse>(); 
        }

        [Required]
        public string Name { get; set; }

        public ICollection<CompanyCourse> Courses { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
