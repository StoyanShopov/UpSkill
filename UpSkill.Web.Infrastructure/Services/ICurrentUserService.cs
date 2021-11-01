namespace UpSkill.Web.Infrastructure.Services
{
    public interface ICurrentUserService
    {
        string GetId();
        string GetUserName();
    }
}
