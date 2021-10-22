namespace UpSkill.Data.Models
{
    using System.Collections.Generic;

    using UpSkill.Data.Common.Models;

    public class Coach : BaseDeletableModel<int>
    {
        public Coach()
        {
            this.Courses = new HashSet<Course>();
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
