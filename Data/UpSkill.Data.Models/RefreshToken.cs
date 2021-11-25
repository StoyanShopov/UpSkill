namespace UpSkill.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Text.Json.Serialization;

    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class RefreshToken
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        public ApplicationUser User { get; set; }

        public string Token { get; set; }

        public DateTime Expires { get; set; }

        public bool IsExpired => DateTime.UtcNow >= this.Expires;

        public DateTime? Revoked { get; set; }

        public bool IsActive => this.Revoked == null && !this.IsExpired;

        public DateTime CreatedOn { get; set; }

        public string CreatedByIp { get; set; }

        public string RevokedByIp { get; set; }

        public string ReplacedByToken { get; set; }
    }
}
