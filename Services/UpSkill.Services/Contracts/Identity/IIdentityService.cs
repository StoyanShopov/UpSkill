namespace UpSkill.Services.Contracts.Identity
{
    using System.Threading.Tasks; 

    using UpSkill.Web.ViewModels.Identity;

    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName,string email, string secret);

        Task RegisterAsync(RegisterRequestModel model);

        Task<LoginResponseModel> LoginAsync(LoginRequestModel model);

        Task<bool> IsEmailExist(string email);
    }
}
