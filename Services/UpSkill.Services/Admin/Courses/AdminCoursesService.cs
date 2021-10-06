namespace UpSkill.Services.Admin.Courses
{
    using System;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Services.Contracts.Admin.Courses;

    public class AdminCoursesService : IAdminCoursesService
    {
        private readonly IDeletableEntityRepository<Company> companyRepository;

        //Constructor has repository injected as an example
        //    Add (Change it with) the model you will need
        public AdminCoursesService(IDeletableEntityRepository<Company> companyRepository)
        {
            this.companyRepository = companyRepository;
        }


        //TO DO:
        //Implement functionality from interface
    }
}
