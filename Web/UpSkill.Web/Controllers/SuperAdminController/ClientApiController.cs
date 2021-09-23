namespace UpSkill.Web.Controllers.SuperAdminController
{
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Web.Controllers.SuperAdminTestController.AdminModels;

    [Authorize(Roles = "SuperAdmin")]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ClientApiController : ApiController
    {
        private readonly ApplicationDbContext data;

        public ClientApiController(ApplicationDbContext data)
        {
            this.data = data;
        }

        [HttpPost]
        public ActionResult AddClient(ClientApiFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

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

            //As there is no particular position for the company owner that has been given from the assignment
            //we can create a special position for Company owners only, that can occupy the first row of table Postions.
            var companyOwnerPosition = this.data.Positions.Where(p => p.Name == "Company Owner").FirstOrDefault();

            client.Position = companyOwnerPosition;
            client.PositionId = companyOwnerPosition.Id;

            //var ownerRole = this.data.Roles.Where(r => r.Name == "CompanyOwner").FirstOrDefault();
            
            this.data.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public ActionResult GetClientByCompanyName(string companyName)
        {
            var company = this.data.Companies
                .Where(c => c.Name == companyName)
                .FirstOrDefault();

            if (company == null)
            {
                return BadRequest();
            }

            var owner = this.data.Users
                .Where(u => u.CompanyId == company.Id)
                .FirstOrDefault();

            if (owner == null)
            {
                return BadRequest();
            }

            var ownerModel = new ClientApiViewModel
            {
                FirstName = owner.FirstName,
                LastName = owner.LastName,
                CompanyName = companyName,
                CoursesCount = 0,
                CoachesCount = 0,
                EmployeeCount = owner.ChildUsers.Count
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
