namespace UpSkill.Web.ViewModels.Lecture
{
    using System.Collections.Generic;

    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Lesson;

    public class LectureInfoViewModel
    {
        public LectureInfoViewModel()
        {
            this.LessonsInfo = new List<LessonInfoViewModel>();
        }
        public string Name { get; set; }

        public string Description { get; set; }

        public IList<LessonInfoViewModel> LessonsInfo { get; set; }
    }
}
