namespace UpSkill.Web.ViewModels.Administration.Courses
{
    using System.Collections.Generic;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CourseViewModel : IMapFrom<Course>
    {
        public CourseViewModel()
        {
            this.Languages = new HashSet<Language>();
        }

        public string Id { get; set; }

        public string Title { get; set; }

        public string CreatorFirstName { get; set; }

        public string CreatorLastName { get; set; }

        public string Description { get; set; }

        public string AdditionalInformation { get; set; }

        public decimal Price { get; set; }

        // the BLOB Storage needed to be set first

        //[Required]
        //public byte[] CreatorCompanyLogo { get; set; }

        //[Required]
        //public byte[] CourseImage { get; set; }

        public int RatingId { get; set; }
        public Rating Rating { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<Language> Languages { get; set; }
    }
}
