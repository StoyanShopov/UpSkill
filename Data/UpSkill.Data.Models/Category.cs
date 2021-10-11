namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;
    public class Category : BaseDeletableModel<int>
    {
        public Category()
        {
        }

        public string Name { get; set; }
    }
}
