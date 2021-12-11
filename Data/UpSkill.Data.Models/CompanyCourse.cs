namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;

    public class CompanyCourse
    {
        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
