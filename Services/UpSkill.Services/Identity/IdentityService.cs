namespace UpSkill.Services.Identity
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

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

        public async Task RegisterAsync(RegisterRequestModel model)
        {
            if (this.userManager.Users.Any(x => x.UserName == model.Username))
            {
                throw new ArgumentException("There is such exist user with this username.");
            }

            if (this.userManager.Users.Any(x => x.Email == model.Email))
            {
                throw new ArgumentException("There is such exist user with this email.");
            }

            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email
            };

            await this.userManager.CreateAsync(user, model.Password);
        }

        public async Task<LoginResponseModel> LoginAsync(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                throw new ArgumentException("There is no such user");
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                throw new ArgumentException("Username or password is incorrect.");
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
    }
}
