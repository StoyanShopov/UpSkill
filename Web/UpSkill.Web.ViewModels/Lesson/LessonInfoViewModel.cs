namespace UpSkill.Web.ViewModels.Lesson
{
    using UpSkill.Data.Models;

    using UpSkill.Services.Mapping;

    public class LessonInfoViewModel : IMapFrom<Lesson>
    {
        public string Url { get; set; }

        public string MediaType { get; set; }
    }
}
