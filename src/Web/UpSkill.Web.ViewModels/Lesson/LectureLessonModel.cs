namespace UpSkill.Web.ViewModels.Lesson
{
    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class LectureLessonModel : IMapFrom<Lesson>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string LessonUrl { get; set; }

        public string LessonMediaType { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<LectureLesson, LectureLessonModel>()
              .ForMember(
              l => l.Id,
              l => l.MapFrom(l => l.LessonId));
        }
    }
}