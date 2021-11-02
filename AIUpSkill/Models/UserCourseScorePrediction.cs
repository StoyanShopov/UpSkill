namespace AIUpSkill.Models
{
    using Microsoft.ML.Data;

    public class UserCourseScorePrediction
    {
        [ColumnName("Score")]
        public float Score { get; set; }
    }
}
