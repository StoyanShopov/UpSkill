namespace UpSkill.Web.Controllers.ClientController
{
    using System.Linq;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Data;
    using UpSkill.Data.Models;
    using UpSkill.Web.Controllers.ClientController.ClientModels;

    [Authorize(Roles = "CompanyOwner")]
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeApiController : Controller
    {
        private readonly ApplicationDbContext data;

        public EmployeeApiController(ApplicationDbContext data)
        {
            this.data = data;
        }

        [HttpPost]
        public ActionResult AddEmployees(EmployeeApiFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var managerId = this.User.Identity.Name;

            var company = this.data.Companies
                .Where(c => c.Name == model.CompanyName)
                .FirstOrDefault();

            if (company == null)
            {
                return BadRequest();
            }

            var postion = this.data.Positions
                .Where(p => p.Name == model.PostionName)
                .FirstOrDefault();

            if (postion == null)
            {
                postion = new Position
                {
                    Name = model.PostionName
                };
            }

            var employee = new ApplicationUser
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                CompanyId = company.Id,
                ManagerId = managerId,
                PositionId = postion.Id,
            };

            var manager = this.data.Users
                .Where(u => u.Id == managerId)
                .FirstOrDefault();

            manager.ChildUsers.Add(employee);

            //Roles shuld be seeded into the database
            //this.data.Roles.AddAsync();

            this.data.Users.Add(employee);
            this.data.SaveChanges();

            return Ok();
        }


    }
}
