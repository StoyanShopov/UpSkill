namespace UpSkill.Web.Infrastructure.Services
{
    using System.Security.Claims;

    using Microsoft.AspNetCore.Http;

    using UpSkill.Web.Infrastructure.Extensions;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user; 

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
            => this.user = httpContextAccessor.HttpContext?.User;

        public string GetId()
           => this.user?.GetUserId();
    }
}
