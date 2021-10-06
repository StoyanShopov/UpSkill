namespace UpSkill.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Admin.Courses;
    using UpSkill.Services.Contracts.Admin.Users;

    public class AdminController : BaseApiController
    {
        private readonly IAdminCoursesService superAdminCoursesService;
        private readonly IAdminUsersService superAdminUsersService;

        //Inject other services if needed
        public AdminController(
            IAdminCoursesService superAdminCoursesService,
            IAdminUsersService superAdminUsersService)
        {
            this.superAdminCoursesService = superAdminCoursesService;
            this.superAdminUsersService = superAdminUsersService;
        }


        //All these are here as an example.
        //You can delete everything.
        //https://www.youtube.com/watch?v=0hCSWkC9VPc 
        //feel blessed

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return null;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return null;
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
