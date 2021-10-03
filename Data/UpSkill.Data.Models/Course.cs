namespace UpSkill.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class Course : BaseDeletableModel<string>
    {
        [Required]
        public string CourseTitle { get; set; }

        [Required]
        public string CreatorFirstName { get; set; }

        [Required]
        public string CreatorLastName { get; set; }

        [Required]
        public string CourseDescription { get; set; }

        [Required]
        public string AdditionalInformation { get; set; }

        [Required]
        public double PricePerPerson { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category CourseCategory { get; set; }

        [Required]
        public byte[] CourseImage { get; set; }

        [Required]
        public byte[] CreatorCompanyLogo { get; set; }

        //some rating property

        [Required]
        public ICollection<Language> CourseLanguages { get; set; } = new List<Language>();
    }
}