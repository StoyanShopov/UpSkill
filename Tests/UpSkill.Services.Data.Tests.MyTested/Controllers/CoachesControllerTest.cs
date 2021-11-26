using MyTested.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpSkill.Web.Controllers;
using UpSkill.Web.ViewModels.Coach;
using Xunit;

namespace UpSkill.Services.Data.Tests.MyTested.Controllers
{
    public class CoachesControllerTest
    {
        [Fact]
        public void GetAllShouldReturnAllCoaches()
        {
            MyController<CoachesController>
                   .Instance()
                   .Calling(c => c.GetAll())
                   .ShouldReturn()
                   .ResultOfType<IEnumerable<CoachListingModel>>();
        }
    }
}

