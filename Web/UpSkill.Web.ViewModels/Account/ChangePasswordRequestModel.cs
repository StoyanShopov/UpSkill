namespace UpSkill.Web.ViewModels.Account
{
    using System.ComponentModel.DataAnnotations;

    public class ChangePasswordRequestModel
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        public string ConfirmNewPassword { get; set; }
    }
}
