namespace UpSkill.Web.ViewModels.Administration.Courses
{ 
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using UpSkill.Data.Models;

    public class CourseFormModel
    {
        [Required]
        public string CourseTitle { get; set; }

        [Required]
        public string CreatorFirstName { get; set; }

        [Required]
        public string CreatorLastName { get; set; }

        [Required]
        public byte[] CreatorCompanyLogo { get; set; }

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

        //some rating property

        [Required]
        public ICollection<Language> CourseLanguages { get; set; } = new List<Language>();

        public ICollection<EmployeeGrade> Grades { get; set; } = new List<EmployeeGrade>();
    }
}
