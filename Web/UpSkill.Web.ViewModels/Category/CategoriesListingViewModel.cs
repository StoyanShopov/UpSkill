namespace UpSkill.Web.ViewModels.Category
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CategoriesListingViewModel: IMapFrom<Category>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
