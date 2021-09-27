namespace UpSkill.Web.Controllers.SuperAdminApiController.AdminModels
{
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Models;

    public class ClientApiFormModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string CompanyName { get; set; }
    }
}
