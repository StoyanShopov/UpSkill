namespace UpSkill.Data.Models
{
    public class CompanyCourse
    {
        public int CompanyId { get; set; } 

        public Company Company { get; set; }

        public int CourseId { get; set; } 

        public Course Course { get; set; }
    }
}
