namespace UpSkill.Web.ViewModels.Coach
{
    using System.ComponentModel.DataAnnotations;

    public class CreateCoachRequestModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
