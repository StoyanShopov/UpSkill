namespace UpSkill.Web.ViewModels.Administration.Courses
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using UpSkill.Data.Models;

    public class CourseInputModel
    {
        public CourseInputModel()
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

        [Required]
        public decimal Price { get; set; }

        // the BLOB Storage needed to be set first

        //[Required]
        //public byte[] CreatorCompanyLogo { get; set; }

        //[Required]
        //public byte[] Image { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int RatingId { get; set; }
        public Rating Rating { get; set; }

        public ICollection<Language> Languages { get; set; }

        //TODO:
        //public ICollection<EmployeeGrade> Grades { get; set; } = new List<EmployeeGrade>();
    }
}
