namespace UpSkill.Web.ViewModels.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterRequestModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
