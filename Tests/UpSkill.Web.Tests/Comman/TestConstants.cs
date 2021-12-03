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

            public const int TestCompanyId = 1;
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
        }

        public class AdministratorConstants
        {
            public const string AdministratorUserName = "administrator";

            public const string AdministratorEmail = "administrator@test.test";
        }

        public class AdminCoursesConstants
        {
            public const string OwnerEmail = "owner@test.test";

            public const string UserEmail = "user@test.test";

            public const string TestTitle = "Title";

            public const string TestDescription = "testDescription";

            public const string TestContent = "testContent";

            // compilation error when try to use this value
            public const decimal TestPrice = 10;

            public const int TestCoachId = 1;

            public const int TestCategoryId = 1;

            public const string PostCourseExist = "PostCourseExist";

            public const string DetailsCourseExist = "DetailsCourseExist";

            public const string DeleteCourseExist = "DeleteCourseExist";

            public const string GetAllCourseExist = "GetAllCourseExist";

            public const string TestPostCreateRouteAdminCourses = "Admin/Courses";

            public const string TestPostAddCompanyRouteAdminCourses = "/Admin/Courses/addCompanyToCourse";

            public const string TestPutEditRouteShouldAdminCourses = "Admin/Courses";

            public const string TestGetDetailsRouteAdminCourses = "/Admin/Courses/details";

            public const string TestDeleteCourseRouteAdminCourses = "Admin/Courses";

            public const string TestGetAllCourseRouteAdminCourses = "/Admin/Courses/getAll";
        }

        public class EmployeeCoursesConstants
        {
            public const string TestGetAllCourseRouteEmployeeCourses = "getAll";

            public const string DatabaseName = "Database";
        }
    }
}
