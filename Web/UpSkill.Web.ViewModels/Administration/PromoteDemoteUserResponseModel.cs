using System.Collections.Generic;

namespace UpSkill.Web.ViewModels.Administration
{
    public class PromoteDemoteUserResponseModel
    {
        public string Email { get; set; }

        public string FullName { get; set; }

        public ICollection<string> Role { get; set; }
    }
}
