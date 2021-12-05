namespace UpSkill.Web.Tests.Mocks
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using UpSkill.Data.Models;

    public class UserManagerMock : UserManager<ApplicationUser>
    {
        public UserManagerMock(
            IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<ApplicationUser> passwordHasher,
            IEnumerable<IUserValidator<ApplicationUser>> userValidators,
            IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators,
            ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors,
            IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger)
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }

        public override Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role)
        {
            if (role == "Employee" || role == "Administrator" || role == "Owner" || role == "Coach")
            {
                return Task.FromResult<IdentityResult>(IdentityResult.Success);
            }

            return base.AddToRoleAsync(user, role);
        }
    }
}
