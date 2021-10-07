namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;

    public class Language : BaseDeletableModel<int>
    {
        public string Name { get; set; }
    }
}
