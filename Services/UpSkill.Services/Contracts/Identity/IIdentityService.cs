namespace UpSkill.Services.Contracts.Identity
{
    using System.Threading.Tasks;

    using UpSkill.Common;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Identity;

    public interface IIdentityService
    {
        Task<string> GenerateJwtToken(ApplicationUser user, string secret);

        Task<Result> RegisterAsync(RegisterRequestModel model);

        Task<LoginResponseModel> LoginAsync(LoginRequestModel model);
    }
}
