namespace UpSkill.Web.ViewModels.Coach
{
    using System.ComponentModel.DataAnnotations;

    using Microsoft.AspNetCore.Http;

    public class CreateCoachRequestModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public IFormFile File { get; set; }

        public string CalendlyUrl { get; set; }
    }
}
