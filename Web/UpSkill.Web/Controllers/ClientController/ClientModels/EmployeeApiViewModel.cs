using System.Collections.Generic;

namespace UpSkill.Web.Controllers.ClientController.ClientModels
{

    public class EmployeeApiViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public byte[] ProfilePicture { get; set; }

        public string Postion { get; set; }

        public string Company { get; set; }

        public int CoursesCount { get; set; }

        public int CoachesCount { get; set; }
    }
}
