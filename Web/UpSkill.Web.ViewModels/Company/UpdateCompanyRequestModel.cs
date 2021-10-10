namespace UpSkill.Web.ViewModels.Company
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateCompanyRequestModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
