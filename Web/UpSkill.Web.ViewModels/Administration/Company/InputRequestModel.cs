namespace UpSkill.Web.ViewModels.Administration.Company
{
    using System.ComponentModel.DataAnnotations;

    public class InputRequestModel
    {
        [Required]
        public string Name { get; set; }
    } 
}
