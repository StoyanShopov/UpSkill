namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Course : BaseDeletableModel<string>
    {
        public Course()
        {
            this.Languages = new HashSet<Language>();
        }

        [Required]
        public string Title { get; set; }

        [Required]
        public string CreatorFirstName { get; set; }

        [Required]
        public string CreatorLastName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string AdditionalInformation { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int RatingId { get; set; }
        public Rating Rating { get; set; }

        //TODO: BLOB Storage needed 

        //[Required]
        //public byte[] CourseImage { get; set; }

        //[Required]
        //public byte[] CreatorCompanyLogo { get; set; }

        public ICollection<Language> Languages { get; set; }
    }
}