namespace UpSkill.Services.SuperAdmin.Courses
{
    using System;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.SuperAdmin.Courses;

    public class SuperAdminCoursesService : ISuperAdminCoursesService
    {
        private readonly IDeletableEntityRepository<Company> companyRepository;

        //Constructor has repository injected as an example
        //    Add (Change it with) the model you will need
        public SuperAdminCoursesService(IDeletableEntityRepository<Company> companyRepository)
        {
            this.companyRepository = companyRepository;
        }


        //TO DO:
        //Implement functionality from interface
    }
}
