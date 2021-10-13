﻿namespace UpSkill.Web.ViewModels.Course
{
    public class EditCourseViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string CoachFirstName { get; set; }

        public string CoachLastName { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }
    }
}