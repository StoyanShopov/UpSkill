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

            public const int TestCompanyId = 1;

            public const string ActiveCourses = "getActiveCourses";
        }

        public class Coach
        {
            public const string TestAddCoachToOwnerRouteCoach = "Owner/Coaches";

            public const string TestGetAllRouteCompanyCoach = "/Owner/Coaches/getAll";

            public const string TestDeleteRouteCompanyCoach = "/Owner/Coaches?id=1";

            public const string TestRequestCoachRouteCompanyCoach = "/Owner/Coaches/newCoach";
        }

        public class Course
        {
            public const string TestgetActiveCoursesRoute = "/Owner/Courses/getActiveCourses";

            public const string TestDisableCourseRoute = "/Owner/Courses/disable?id=1";

            public const string TestRequestCourseRoute = "/Owner/Courses/RequestCourse";
        }

        public class Employee
        {
            public const string TestEmployeeInvalidName = "TestEmployee";

            public const string TestEmployeeFullName = "TestEmployee TestEmployee";

            public const string TestEmployeeEmail = "TestEmployee@gmail.com";

            public const string TestEmployeePosition = "TestPosition";

            public const string EmailExists = "An employee with this email already exists.";

            public const string WrongEmployeeNamePattern = "Please add only First and Last name of the employee. Example:John Smith  ";

            public const string EmployeeSuccesfullyDeleted = "Employee was successfully removed";

            public const string TestCreateEmployeeRoute = "Owner/Employee";

            public const string TestGetAllRoute = "/Owner/Employee/getAll";

            public const string TestDeleteEmployeeRoute = "/Owner/Employee?id=1";

            public const string TestGetAllCompanyEmployeesRoute = "/Owner/Employee/getAllEmployees";
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

            // compilation error when try to use this value
            public const decimal TestPrice = 10;

            public const int TestCoachId = 1;

            public const int TestCategoryId = 1;

            public const string PostCourseExist = "PostCourseExist";

            public const string DetailsCourseExist = "DetailsCourseExist";

            public const string DeleteCourseExist = "DeleteCourseExist";

            public const string GetAllCourseExist = "GetAllCourseExist";
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
