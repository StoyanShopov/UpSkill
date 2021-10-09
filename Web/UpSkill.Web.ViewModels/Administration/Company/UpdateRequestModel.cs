namespace UpSkill.Web.ViewModels.Administration.Company
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateRequestModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
