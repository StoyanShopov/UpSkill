namespace UpSkill.Web.Tests.Comman
{
    public static class TestConstants
    {
        public class Comman
        {
            public const string GetAll = "getAll";

            public const string Details = "details";
        }

        public class Company
        {
            public const string CompanyExist = "CompanyExist";

            public const string TestCompany = "TestCompany";
            public const string EditedCompany = "EditedCompany";

            public const string TestPostRouteCompany = "Admin/companies";

            public const string TestPutRouteCompany = "/Admin/companies?id=1";

            public const string TestDeleteRouteCompany = "/Admin/companies?id=1";
        }
    }
}
