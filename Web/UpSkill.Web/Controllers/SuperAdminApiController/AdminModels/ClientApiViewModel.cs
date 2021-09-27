
namespace UpSkill.Web.Controllers.SuperAdminApiController.AdminModels
{ 
    using System.Collections.Generic;
    
    using UpSkill.Data.Models;
    
    public class ClientApiViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CompanyName { get; set; }

        public ICollection<EmployeesApiViewModel> Employees { get; set; } = new List<EmployeesApiViewModel>();

        public int CoursesCount { get; set; }

        public int CoachesCount { get; set; }
    }
}
