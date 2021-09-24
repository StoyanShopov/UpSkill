namespace UpSkill.Common
{
    public static class GlobalConstants
    {
        public const string SystemName = "UpSkill";

        public const string AdministratorRoleName = "Administrator";

        public const string AppSettingJson = "appsettings.json";

        public const string DefaultConnection = "DefaultConnection";

        public const string ApplicationSettings = "ApplicationSettings";

        public class AutoMapperConstants
        {
            public const string ReflectionProfile = "ReflectionProfile";
        }

        public class SwaggerConstants
        {
            public const string UpSkillAPI = "UpSkill API";
            public const string V1 = "v1";
            public const string SwaggerHttpPath = "/swagger/v1/swagger.json";
        }

        public class IdentityConstants
        {
            public const string JWT = "jwt";

            public const string UserNotFound = "There is no such user";
            public const string IncorrectEmailOrPassword = "Email or password is incorrect.";
            public const string EmailExist = "There is such exist user with this email.";
            public const string UsernameExist = "There is such exist user with this username.";
            public const string PasswordNotMatch = "Password and confirm password must be the same.";
        }

        public class ControllerRoutesConstants
        {
            public const string LoginRoute = "login";
            public const string RegisterRoute = "register";
            public const string LogoutRoute = "logout";
            public const string UserRoute = "user";
        }

        public class MessagesConstants
        {
            public const string SuccessMessage = "Success";
        }
    }
}
