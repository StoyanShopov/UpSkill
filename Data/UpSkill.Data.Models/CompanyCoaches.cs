namespace UpSkill.Data.Models
{
    public class CompanyCoaches
    {
        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int CoachId { get; set; }

        public Coach Coach { get; set; }
    }
}
