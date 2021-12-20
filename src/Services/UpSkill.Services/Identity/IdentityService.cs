namespace UpSkill.Services.Identity
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using UpSkill.Common;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Identity;
    using UpSkill.Web.ViewModels.Identity;

    using static UpSkill.Common.GlobalConstants.IdentityConstants;
    using static UpSkill.Common.GlobalConstants.PositionsNamesConstants;
    using static UpSkill.Common.GlobalConstants.RolesNamesConstants;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IDeletableEntityRepository<Company> companies;
        private readonly IDeletableEntityRepository<Position> positions;
        private readonly IDeletableEntityRepository<ApplicationUser> users;
        private readonly AppSettings appSettings;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IOptions<AppSettings> appSettings,
            IDeletableEntityRepository<Company> companies,
            IDeletableEntityRepository<Position> positions,
            IDeletableEntityRepository<ApplicationUser> users)
        {
            this.userManager = userManager;
            this.companies = companies;
            this.appSettings = appSettings.Value;
            this.positions = positions;
            this.users = users;
        }

        public async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);

            List<string> roles = (await this.userManager.GetRolesAsync(user)).ToList();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Claims = new Dictionary<string, object>()
                {
                    { ClaimTypes.NameIdentifier, user.Id },
                    { ClaimTypes.Name, user.UserName },
                    { ClaimTypes.Email, user.Email },
                },
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            foreach (string role in roles)
            {
                tokenDescriptor.Claims.Add(ClaimTypes.Role, role);
            }

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public RefreshToken GenerateRefreshToken()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[64];
            rngCryptoServiceProvider.GetBytes(randomBytes);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomBytes),
                Expires = DateTime.UtcNow.AddDays(7),
            };
        }

        public async Task<Result> RegisterAsync(RegisterRequestModel model)
        {
            var company = await this.companies
                .All()
                .FirstOrDefaultAsync(x => x.Name == model.CompanyName);

            var positionObj = await this.positions
                .AllAsNoTracking()
                .FirstOrDefaultAsync(x => x.Name == OwnerPositionName);

            if (company == null)
            {
                company = new Company { Name = model.CompanyName };
            }

            var user = new ApplicationUser()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Company = company,
                PositionId = positionObj.Id,
                Email = model.Email,
                UserName = model.Email,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);
            await this.userManager.AddToRoleAsync(user, CompanyOwnerRoleName);

            return result.Succeeded;
        }

        public async Task<LoginResponseModel> LoginAsync(LoginRequestModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                throw new ArgumentException(UserNotFound);
            }

            if (!user.EmailConfirmed)
            {
                throw new ArgumentException(ConfirmEmail);
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                throw new ArgumentException(IncorrectEmailOrPassword);
            }

            var token = await this.GenerateJwtToken(user);

            this.users.Update(user);
            await this.users.SaveChangesAsync();

            return new LoginResponseModel()
            {
                Token = token,
            };
        }
    }
}
