namespace UpSkill.Web.ViewModels.Company
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateCompanyRequestModel
    {
        [Required]
        public string Name { get; set; }
    }
}
