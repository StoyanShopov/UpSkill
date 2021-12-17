namespace UpSkill.Web.ViewModels.Owner
{
    using System.ComponentModel.DataAnnotations;

    public class RequestCoachModel
    {
        [Required]
        public string RequesterEmail { get; set; }

        public string RequesterName { get; set; }

        public string Description { get; set; }

        public string Field { get; set; }

        public string Phone { get; set; }

        public string Company { get; set; }
    }
}
