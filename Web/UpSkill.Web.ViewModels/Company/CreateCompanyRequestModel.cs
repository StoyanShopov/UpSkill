namespace UpSkill.Web.ViewModels.Company
{
    using System.ComponentModel.DataAnnotations;

    public class CreateCompanyRequestModel
    {
        [Required]
        public string Name { get; set; }
    }
}
