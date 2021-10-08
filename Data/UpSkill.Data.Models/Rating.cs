namespace UpSkill.Data.Models
{
    using UpSkill.Data.Common.Models;

    public class Rating : BaseDeletableModel<int>
    {
        public double CourseRating { get; set; }
    }
}