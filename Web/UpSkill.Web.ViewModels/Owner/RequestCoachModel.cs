using System.ComponentModel.DataAnnotations;

namespace UpSkill.Web.ViewModels.Owner
{
    public class RequestCoachModel
    {
        [Required]
        public string RequesterEmail { get; set; }

        public string RequesterName { get; set; }

        public string Description { get; set; }

        public string Field { get; set; }
    }
}
