namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Position : BaseDeletableModel<int>
    {
        public Position()
        {
            this.Users = new HashSet<ApplicationUser>();
        }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
