namespace UpSkill.Web.ViewModels.Company
{
    using UpSkill.Services.Mapping;
    using UpSkill.Data.Models; 

    public class CompanyListingModel : IMapFrom<Company>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
