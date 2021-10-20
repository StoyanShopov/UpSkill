namespace UpSkill.Web.ViewModels.Company
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class CompanyListingModel : IMapFrom<Company>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
