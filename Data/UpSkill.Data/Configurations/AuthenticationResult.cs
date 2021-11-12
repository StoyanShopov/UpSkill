namespace UpSkill.Data.Configurations
{
    using System.Collections.Generic;

    public class AuthenticationResult
    {
        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public bool Success { get; set; }

        public List<string> Errors { get; set; }
    }
}
