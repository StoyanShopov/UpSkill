namespace UpSkill.Web.Controllers.SuperAdminApiController
{
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.PasswordGenerator;
    using UpSkill.Web.Controllers.SuperAdminApiController.AdminModels;

    [Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ClientApiController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;

        private readonly ApplicationDbContext data;

        private readonly IPasswordGenerator passwordGenerator;

        public ClientApiController(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            ApplicationDbContext data,
            IPasswordGenerator passwordGenerator, 
            PasswordHasher<ApplicationUser> passwordHasher)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;

            this.data = data;

            this.passwordGenerator = passwordGenerator;
        }

        [HttpPost]
        public ActionResult AddClient(ClientApiFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var password = passwordGenerator.GeneratePassord();

            var client = new ApplicationUser();

            var companyExists = this.data.Companies
                .Any(c => c.Name == model.CompanyName);

            if (!companyExists)
            {
                var company = new Company
                {
                    Name = model.CompanyName,
                    Users = new HashSet<ApplicationUser>()
                };

                client.CompanyId = company.Id;
            }

            client.FirstName = model.FirstName;
            client.LastName = model.LastName;

            client.ManagerId = null;
            client.Manager = null;

            client.Email = model.Email;

            this.userManager.AddPasswordAsync(client, password);

            var companyOwnerPosition = this.data.Positions
                .Where(p => p.Name == "Owner")
                .FirstOrDefault();

            client.Position = companyOwnerPosition;
            client.PositionId = companyOwnerPosition.Id;

            var roleName = this.roleManager
                .FindByNameAsync("Owner")
                .Result.Name;

            this.userManager.AddToRoleAsync(client, roleName);

            this.data.Users.Add(client);
            this.data.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public ActionResult GetClientById(string id)
        {
            var client = this.data.Users.Find(id);

            if (client == null)
            {
                return BadRequest();
            }

            var employees = this.data.Users
                .Where(e => e.ManagerId == client.Id)
                .ToList();

            var ownerModel = new ClientApiViewModel
            {
                FirstName = client.FirstName,
                LastName = client.LastName,
                CompanyName = client.Company.Name,
                CoursesCount = 0,
                CoachesCount = 0,
                Employees = new List<EmployeesApiViewModel>()
            };

            return Ok(ownerModel);
        }

        [HttpPut]
        public ActionResult EditClient(ClientApiFormModel model, string clientId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var client = this.data.Users
                .Where(c => c.Id == clientId)
                .FirstOrDefault();

            if (client == null)
            {
                return BadRequest();
            }

            client.FirstName = model.FirstName;
            client.LastName = model.LastName;
            client.Company.Name = model.CompanyName;

            this.data.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteClient(string clientId)
        {
            var client = this.data.Users
                .Find(clientId);

            if (client == null)
            {
                return BadRequest();
            }

            var clientEmployees = this.data.Users
                .Where(e => e.ManagerId == clientId)
                .ToList();

            foreach (var employee in clientEmployees)
            {
                this.data.Users.Remove(employee);
            }

            this.data.Users.Remove(client);
            this.data.SaveChanges();

            return Ok();
        }
    }
}
