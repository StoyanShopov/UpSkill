namespace UpSkill.Web.Areas.Admin.Category
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using UpSkill.Services.Data.Contracts.Category;
    using UpSkill.Web.ViewModels.Category;

    using static Common.GlobalConstants.ControllerRoutesConstants;


    public class CategoriesController : AdministrationBaseController
    {
        private ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<CategoriesListingViewModel>> GetAll()
        {
            return await this.categoriesService.GetAllAsync<CategoriesListingViewModel>();
        }
    }
}
