namespace UpSkill.Web.ViewModels.Administration.Courses
{
    using System.Collections.Generic;

    using UpSkill.Data.Models;

    public class CourseViewModel
    {
        public string Id { get; set; }

        public string CourseTitle { get; set; }

        public string CreatorFirstName { get; set; }

        public string CreatorLastName { get; set; }

        public string CourseDescription { get; set; }

        public string AdditionalInformation { get; set; }

        public double PricePerPerson { get; set; }

        public int CategoryId { get; set; }
        public Category CourseCategory { get; set; }

        public byte[] CourseImage { get; set; }

        public byte[] CreatorCompanyLogo { get; set; }

        //some rating property

        public ICollection<Language> CourseLanguages { get; set; } = new List<Language>();

        public ICollection<EmployeeGrade> Grades { get; set; } = new List<EmployeeGrade>();
    }
}
