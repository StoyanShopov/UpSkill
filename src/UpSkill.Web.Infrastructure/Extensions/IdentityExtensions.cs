namespace UpSkill.Web.Infrastructure.Extensions
{
    using System.Linq;
    using System.Security.Claims;

    public static class IdentityExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
            => user
            .Claims
            .FirstOrDefault(u => u.Type == ClaimTypes.NameIdentifier)?
            .Value;
    }
}
