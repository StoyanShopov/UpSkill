namespace UpSkill.Web.ViewModels.Administration.Company
{
    using System.ComponentModel.DataAnnotations;

    public class AddCompanyOwnerRequestModel
    {
        [Required]
        public string Email { get; set; }
    }
}
