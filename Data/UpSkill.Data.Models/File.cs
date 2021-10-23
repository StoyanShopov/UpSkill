namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;

    public class File : BaseDeletableModel<int>
    {
        public string FilePath { get; set; }
    }
}
