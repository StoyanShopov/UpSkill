namespace UpSkill.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using UpSkill.Data.Common.Models;

    //TODO:
    //This is basic model for testing courses CRUD functionality
    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
        }

        public string Title { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
