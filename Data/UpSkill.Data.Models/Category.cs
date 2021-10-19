namespace UpSkill.Data.Models
{
    using Common.Models;

    public class Category : BaseDeletableModel<int>
    {
        public string Name { get; set; }
    }
}
