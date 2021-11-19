using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UpSkill.Web.ViewModels.Owner
{
    public class RequestCoachModel
    {
        public string RequesterEmail { get; set; }

        public string RequesterName { get; set; }

        public string Description { get; set; }

        public string Field { get; set; }
    }
}
