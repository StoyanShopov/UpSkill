namespace UpSkill.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.SuperAdmin.Users;
    using UpSkill.Web.ViewModels.Administration.Users;

    public class SuperAdminController : ApiController
    {
        private readonly ISuperAdminUsersService superAdminUsersService;

        //Inject other services if needed
        public SuperAdminController(ISuperAdminUsersService superAdminUsersService)
        {
            this.superAdminUsersService = superAdminUsersService;
        }

        public async Task<IActionResult> PromoteUser(UserByEmailViewModel viewModel)
        {

            return null;
        }

        public async Task<IActionResult> DemoteUser(UserByEmailViewModel viewModel)
        {

            return null;
        }
    }
}
