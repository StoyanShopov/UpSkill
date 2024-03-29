﻿namespace UpSkill.Data.Models
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
            this.Coaches = new HashSet<CompanyCoach>();
        }

        [Required]
        public string Name { get; set; }

        public int? FileId { get; set; }

        public File File { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }

        public virtual ICollection<CompanyCourse> Courses { get; set; }

        public virtual ICollection<CompanyCoach> Coaches { get; set; }
    }
}
