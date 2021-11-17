namespace UpSkill.Web.ViewModels.Course
{
    using System.Collections.Generic;

    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;
    using UpSkill.Web.ViewModels.Lecture;

    public class AggregatedCourseInfo : IMapFrom<Course>
    {


        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        public int CoachId { get; set; }

        public string FileFilePath { get; set; }

        public ICollection<LectureInfoViewModel> LecturesInfo { get; set; }
    }
}
