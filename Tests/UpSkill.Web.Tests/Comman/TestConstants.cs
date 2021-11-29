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

        public class Coach
        {
            public const string TestAddCoachToOwnerRouteCoach = "Owner/Coaches";
            public const string TestGetAllRouteCompanyCoach = "/Owner/Coaches/getAll";
        }

        public class RolesNamesConstants
        {
            public const string AdministratorRoleName = "Administrator";

            public const string CompanyOwnerRoleName = "Owner";

            public const string CompanyEmployeeRoleName = "Employee";
        }

        public class CompanyOwnerConstants
        {
            public const string TestOwnerUserName = "ownerMotionSoftware";
            public const string TestOwnerEmail = "ownerMotionSoftware@test.test";
            public const int TestCompanyId = 2;
        }
    }
}
