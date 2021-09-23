namespace UpSkill.Web.Controllers.SuperAdminTestController.AdminModels
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
        public string CompanyName { get; set; }
    }
}
