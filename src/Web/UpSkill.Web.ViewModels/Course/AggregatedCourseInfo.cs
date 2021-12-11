namespace UpSkill.Web.ViewModels.Course
{
    using System.Collections.Generic;

    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Lecture;

    public class AggregatedCourseInfo : IMapFrom<Course>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string CourseTitle { get; set; }

        public string CourseDescription { get; set; }

        public decimal CoursePrice { get; set; }

        public int CourseCategoryId { get; set; }

        public string CourseCoachFirstName { get; set; }

        public string CourseCoachLastName { get; set; }

        public string CourseFileFilePath { get; set; }

        public IEnumerable<CourseLectureModel> CourseLectures { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CourseLecture, AggregatedCourseInfo>()
              .ForMember(
              c => c.Id,
              c => c.MapFrom(c => c.CourseId));
        }
    }
}
