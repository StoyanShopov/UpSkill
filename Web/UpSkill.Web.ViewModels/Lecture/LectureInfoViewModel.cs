namespace UpSkill.Web.ViewModels.Lecture
{
    using AutoMapper;
    using System.Collections.Generic;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Lesson;

    public class LectureInfoViewModel : IHaveCustomMappings
    {
        public LectureInfoViewModel()
        {
            this.LessonsInfo = new List<LessonInfoViewModel>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IList<LessonInfoViewModel> LessonsInfo { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CourseLecture, LectureInfoViewModel>()
               .ForMember(
               c => c.Id,
               c => c.MapFrom(c => c.LecturesId));
        }
    }
}
