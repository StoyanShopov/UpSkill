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

        [Required]
        public string Field { get; set; }

        public decimal Price { get; set; }

        public IFormFile File { get; set; }

        [Required]
        public string CalendlyUrl { get; set; }
    }
}
