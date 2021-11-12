
namespace UpSkill.Data.Models
{
    using System;
    using System.Text.Json.Serialization;

    using UpSkill.Data.Common.Models;

    public class RefreshToken : BaseDeletableModel<int>
    {
        public string Token { get; set; }

        public DateTime Expires { get; set; }

        public bool IsExpired => DateTime.UtcNow >= this.Expires;

        public string CreatedByIp { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public DateTime? Revoked { get; set; }

        public string RevokedByIp { get; set; }

        public string ReplacedByToken { get; set; }

        public bool IsActive => this.Revoked == null && !this.IsExpired;
    }
}
