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

            public const string TestFirstName = "TestFirstName";

            public const string TestLastName = "TestLastName";

            public const string TestEmail = "testEmail@abv.bg";

            public const string TestCompanyName = "TestCompanyName";

            public const string TestPassword = "testPass123";

            public const string TestConfirmPassword = "testPass123";
        }
    }
}
