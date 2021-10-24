namespace UpSkill.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using UpSkill.Data.Common.Models;

    public class File : BaseDeletableModel<int>
    {
        [Required]
        public string FilePath { get; set; }
    }
}
