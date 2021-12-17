namespace UpSkill.Web.ViewModels.Lecture
{
    using System.Collections.Generic;

    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Lesson;

    public class CourseLectureModel : IMapFrom<Lecture>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string LectureName { get; set; }

        public string LectureDescription { get; set; }

        public IEnumerable<LectureLessonModel> LectureLessons { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CourseLecture, CourseLectureModel>()
               .ForMember(
               l => l.Id,
               l => l.MapFrom(l => l.LectureId));
        }
    }
}