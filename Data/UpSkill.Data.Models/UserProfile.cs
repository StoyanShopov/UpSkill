namespace UpSkill.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class UserProfile : BaseDeletableModel<int>
    {
        [Required]
        public string UserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public string PhotoFilePath { get; set; }

        public string ProfileSummary { get; set; }
    }
}
