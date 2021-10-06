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

        public SuperAdminController(ISuperAdminUsersService superAdminUsersService)
        {
            this.superAdminUsersService = superAdminUsersService;
        }

        public async Task<IActionResult> UpdateUserRole(UserByEmailViewModel viewModel)
        {
            var user = this.superAdminUsersService
                           .UpdateUser(viewModel.Email, viewModel.Keyword);

            return Ok($"{viewModel.Email} role was updated successfully!");
        }
    }
}
