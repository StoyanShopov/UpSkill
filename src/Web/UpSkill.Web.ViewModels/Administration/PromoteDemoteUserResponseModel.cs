namespace UpSkill.Web.ViewModels.Administration
{
    using System.Collections.Generic;

    public class PromoteDemoteUserResponseModel
    {
        public string Email { get; set; }

        public string FullName { get; set; }

        public ICollection<string> Role { get; set; }
    }
}
