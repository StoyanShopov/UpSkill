namespace UpSkill.Services.Identity
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

    using static UpSkill.Common.GlobalConstants.IdentityConstants;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly AppSettings appSettings;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IOptions<AppSettings> appSettings)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
        }

        public string GenerateJwtToken(string userId, string userName, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false

            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }

        public async Task RegisterAsync(RegisterRequestModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email
            };

            await this.userManager.CreateAsync(user, model.Password);
        }

        public async Task<LoginResponseModel> LoginAsync(LoginRequestModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                throw new ArgumentException(UserNotFound);
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                throw new ArgumentException(IncorrectUsernameOrPassword);
            }

            var token = GenerateJwtToken(
                user.Id,
                user.UserName,
                this.appSettings.Secret);
       
            return new LoginResponseModel()
            {
                Token = token
            };
        }

        public async Task<bool> IsEmailExist(string email)
            => await this.userManager.Users.AnyAsync(x => x.Email == email);

        public async Task<bool> IsUsernameExist(string username)
            => await this.userManager.Users.AnyAsync(x => x.UserName == username);
    }
}
