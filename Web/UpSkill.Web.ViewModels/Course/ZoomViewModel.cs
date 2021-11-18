namespace UpSkill.Web.ViewModels.Course
{
    using AutoMapper;

    using UpSkill.Data.Models;
    using UpSkill.Services.Mapping;

    public class ZoomViewModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string CoachFirstName { get; set; }
        
        public string CoachLastName { get; set; }

        public string CoachId { get; set; }
    }
}
