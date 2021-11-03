using System.Collections.Generic;

namespace UpSkill.Web.Infrastructure.Services
{
    public interface IPasswordGeneratorService
    {
        public string CreateRandomPassword(int length);
        public string GetRandomString(int length, IEnumerable<char> characterSet);
    }
}