namespace UpSkill.Common
{
    public static class GlobalConstants
    {
        public const string SystemName = "UpSkill";

        public const string AppSettingJson = "appsettings.json";

        public const string DefaultConnection = "DefaultConnection";

        public const string ApplicationSettings = "ApplicationSettings";

        public const string Unauthorized = "Unauthorized";

        public const string UserNotFound = "User not found!";

        public class AdminConstants
        {
            public const string AlreadyAssignedToRole = "This user is already updated wtih the corresponding role!";

            public const string AssignedSuccessfully = "User successfully promoted!";

            public const string UnassignedSuccessfully = "User successfully demoted!";
        }
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


        public class UsersEmailsNames
        {
            public const string AdministratorEmailName = "administrator@test.test";

            public const string OwnerMotionSoftwareEmailName = "ownerOfMotionSoftware@test.test";

            public const string EmployeeMotionSoftwareEmailName = "employeeMo@test.test";
        }

        public class IdentityConstants
        {
            public const string JWT = "jwt";
            public const string Identity = "identity";

            public const string UserNotFound = "There is no such user";
            public const string IncorrectEmailOrPassword = "Email or password is incorrect.";
            public const string EmailExist = "There is such exist user with this email.";
            public const string UsernameExist = "There is such exist user with this username.";
            public const string PasswordNotMatch = "Password and confirm password must be the same.";
            public const string ConfirmEmail = "Please confirm your account. From the email we sent to you.";
        }

        public class AccountConstants
        {
            public const string WrongOldPassword = "Old password is invalid.";
            public const string DifferentPasswords = "New password and confirm new password must be the same.";
        }

        public class ControllerRoutesConstants
        {
            public const string HeaderOrigin = "origin";

            public const string LoginRoute = "login";
            public const string RegisterRoute = "register";
            public const string LogoutRoute = "logout";
            public const string UserRoute = "user";

            public const string VerifyEmailRoute = "verifyEmail";
            public const string ResendEmailConfirmationLinkRoute = "resendEmailConfirmationLink";

            public const string ChangePasswordRoute = "changePassword";

            public const string CreateRoute = "create";

            public const string EditRoute = "edit";

            public const string DeleteRoute = "delete";

            public const string DetailsRoute = "details";

            public const string GetAllRoute = "getall";

            public const string AddOwnerCompany = "addOwnerToCompany";

            public const string Promote = "promote";

            public const string Demote = "demote";
        }

        public class MessagesConstants
        {
            public const string SuccessMessage = "Success";
            public const string IncorrectEmail = "Your email is incorrect.";
            public const string EmailConfirmed = "Email confirmed - you can now login.";
            public const string EmailsDoNotMatch = "This is not the email you registered with.";
        }

        public class EmailSenderConstants
        {
            public const string SendGridApiKey = "SendGrid:ApiKey";

            public const string EmailControllerName = "email";
            public const string FromEmail = "middnight_man@protonmail.com";
            public const string FromName = "middnight_man";
            public const string EmailSubject = "Verify Email";
            public const string HtmlContent = "<p>Verify your email:</p><p><a href='{0}'>CLICK here</a></p>";
            public const string VerifyUrl = "https:/{0}/{1}/{2}/{3}?token={4}&email={5}";
        }

        public class RolesNamesConstants
        {
            public const string AdministratorRoleName = "Administrator";

            public const string CompanyOwnerRoleName = "Owner";

            public const string CompanyEmployeeRoleName = "Employee";
        }

        public class PositionsNamesConstants
        {
            public const string OwnerPositionName = "Owner";

            public const string GraphicDesignerPositionName = "Graphic Designer";

            public const string SoftwareDeveloperPositionName = "Software Developer";

            public const string SeniorSoftwareDeveloperPositionName = "Senior Software Developer";

            public const string AdministratorPositionName = "Administrator";

            public const string PositionDoesNotExist = "The position you entered does not exist";
        }

        public class CompaniesNamesConstants
        {
            public const string MotionCompanyName = "Motion Software";

            public const string ScaleFocusCompanyName = "Scale Focus";

            public const string AdministratorCompanyName = "UpSkill";
        }

        public class CompaniesConstants
        {
            public const string AlreadyExist = "This already exist.";

            public const string DoesNotExist = "This doesn't exist.";

            public const string UserDoNotExist = "This user with this role does not exist.";

            public const string SuccesfullyCreated = "Successfully created.";

            public const string SuccesfullyEdited = "Successfully edited.";

            public const string SuccesfullyDeleted = "Successfully removed";

            public const string SuccesfullyAddedOwnerToGivenCompany = "You have successfully added an owner to this company.";
        }

        public class PoliciesNamesConstants
        {
            public const string AdministratorOnly = "AdministratorOnly";
        }
    }
}


