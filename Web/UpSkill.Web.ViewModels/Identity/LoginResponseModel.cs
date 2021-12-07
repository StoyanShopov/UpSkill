namespace UpSkill.Web.ViewModels.Identity
{
    using System.Text.Json.Serialization;

    public class LoginResponseModel
    {
        public string Id { get; set; }

        public string Token { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }
    }
}
