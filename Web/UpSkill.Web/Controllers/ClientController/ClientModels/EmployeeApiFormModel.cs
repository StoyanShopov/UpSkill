namespace UpSkill.Web.Controllers.ClientController.ClientModels
{
    using System.ComponentModel.DataAnnotations;

    public class EmployeeApiFormModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string PostionName { get; set; }

        public string EmployeeId { get; set; }
    }
}
