namespace UpSkill.Web.Infrastructure.Services
{
    using Microsoft.AspNetCore.Http;

    using System.Security.Claims;

    using UpSkill.Web.Infrastructure.Extensions;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user; 

        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
            => this.user = httpContextAccessor.HttpContext?.User;

        public string GetId()
           => this.user?.GetUserId();
    }
}
