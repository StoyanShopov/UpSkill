namespace UpSkill.Web.ViewModels.Owner
{
    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class GetCourseByIdViewModel : IMapFrom<CompanyCourse>
    {
        public int CourseId { get; set; }
    }
}
