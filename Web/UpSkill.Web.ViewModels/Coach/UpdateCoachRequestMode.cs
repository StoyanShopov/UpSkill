namespace UpSkill.Web.ViewModels.Coach
{
    using Microsoft.AspNetCore.Http;

    public class UpdateCoachRequestMode
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Field { get; set; }

        public decimal Price { get; set; }

        public IFormFile File { get; set; }

        public string CalendlyUrl { get; set; }
    }
}
