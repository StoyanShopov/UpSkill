namespace UpSkill.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class UserProfile : BaseDeletableModel<int>
    {
        [Required]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public int? FileId { get; set; }

        public File File { get; set; }

        public string ProfileSummary { get; set; }
    }
}
