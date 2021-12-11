namespace UpSkill.Web.Infrastructure.Services
{
    using System.Collections.Generic;

    public interface IPasswordGeneratorService
    {
        public string CreateRandomPassword(int length);

        public string GetRandomString(int length, IEnumerable<char> characterSet);
    }
}
