namespace UpSkill.Web.Infrastructure.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;

    public class PasswordGeneratorService : IPasswordGeneratorService
    {
        public string CreateRandomPassword(int length)
        {
            const string alphanumericCharacters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz" +
                "0123456789";
            return this.GetRandomString(length, alphanumericCharacters);
        }

        public string GetRandomString(int length, IEnumerable<char> characterSet)
        {
            if (length < 0)
            {
                throw new ArgumentException("length must not be negative", nameof(length));
            }

            // 250 million chars ought to be enough for anybody
            if (length > int.MaxValue / 8)
            {
                throw new ArgumentException("length is too big", nameof(length));
            }

            if (characterSet == null)
            {
                throw new ArgumentNullException(nameof(characterSet));
            }

            var characterArray = characterSet.Distinct().ToArray();
            if (characterArray.Length == 0)
            {
                throw new ArgumentException("characterSet must not be empty", nameof(characterSet));
            }

            var bytes = new byte[length * 8];
            new RNGCryptoServiceProvider().GetBytes(bytes);
            var result = new char[length];
            for (int i = 0; i < length; i++)
            {
                ulong value = BitConverter.ToUInt64(bytes, i * 8);
                result[i] = characterArray[value % (uint)characterArray.Length];
            }

            return new string(result);
        }
    }
}
