namespace UpSkill.Services.Contracts.Identity
{
    using System.Threading.Tasks; 

    using UpSkill.Common;
    using UpSkill.Web.ViewModels.Identity;

    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string email, string secret); 

        Task<Result> RegisterAsync(RegisterRequestModel model);

        Task<LoginResponseModel> LoginAsync(LoginRequestModel model);
    }
}
