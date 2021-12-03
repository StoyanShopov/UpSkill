namespace UpSkill.Web.Tests.Comman
{
    public static class TestConstants
    {
        public class Comman
        {
            public const string GetAll = "getAll";

            public const string Details = "details";

            public const string OwnerRole = "Owner";
        }

        public class Company
        {
            public const string PostCompanyExist = "PostCompanyExist";

            public const string PutCompanyExist = "PutCompanyExist";

            public const string DeleteCompanyExist = "DeleteCompanyExist";

            public const string GetAllCompanyExist = "GetAllCompanyExist";

            public const string GetDeatailsCompanyExist = "GetDetailsCompanyExist";

            public const string TestCompany = "TestCompany";

            public const string EditedCompany = "EditedCompany";

            public const string TestPostRouteCompany = "Admin/Companies";

            public const string TestPutRouteCompany = "/Admin/Companies?id=1";

            public const string TestDeleteRouteCompany = "/Admin/Companies?id=1";

            public const string TestGetAllRouteCompany = "/Admin/Companies/getAll";

            public const string TestGetDetailsRouteCompany = "/Admin/Companies/details?id=1";
        }

        public class Identity
        {
            public const string IdentityRegisterDatabaseWithValidInputData = "IdentityRegisterDatabase";

            public const string IdentityRegisterEmailAlreadyExist = "IdentityRegisterEmailAlreadyExist";

            public const string LoginReturnToken = "LoginReturnToken";

            public const string LoginReturnIncorrectEmailOrPassword = "LoginReturnIncorrectEmailOrPassword";

            public const string TestAuthentication = "TestAuthentication";

            public const string GetCurrentUser = "GetCurrentUser";

            public const string GetCurrentUserAllowedHttpGet = "GetCurrentUserAllowedHttpGet";

            public const string TestFirstName = "TestFirstName";

            public const string TestLastName = "TestLastName";

            public const string TestEmail = "testEmail@abv.bg";

            public const string TestCompanyName = "TestCompanyName";

            public const string TestPassword = "admin!";

            public const string TestConfirmPassword = "admin!";

            public const string FakePassword = "123pp";

            public const string PostRegisterRoute = "/Identity/register";

            public const string PostLoginRoute = "/Identity/login";

            public const string PostLogoutRoute = "/Identity/logout";

            public const string GetCurrentUserRoute = "/Identity/user";
        }

        public class Account
        {
            public const string AccountChangesPasswordSuccessguly = "AccountChangesPasswordSuccessguly";

            public const string AccountChangePasswordBadRequestTheUserDoesntExist = "AccountChangePasswordBadRequestTheUserDoesntExist";

            public const string WrongPassword = "WrongPassword";

            public const string FakeConfirmNewPasswordDb = "FakeConfirmNewPasswordDb";

            public const string UserId = "2";

            public const string FakeUserId = "77d";

            public const string OldPassword = "admin!";

            public const string NewPassword = "newPassword";

            public const string ConfirmNewPassword = "newPassword";

            public const string FakeOldPassword = "FakeOldPassword";

            public const string FakeConfirmNewPassword = "FakeConfirmNewPassword";

            public const string AccountChangePasswordRoute = "/Account/changePassword";
        }
    }
}
