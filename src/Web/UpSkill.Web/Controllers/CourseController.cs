namespace UpSkill.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Web.ViewModels.Course;

    public class CourseController : ApiController
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<AggregatedCourseInfo> AggregatedInformation(int id)
            => await this.courseService
                     .GetAggregatedCourseInfoAsync<AggregatedCourseInfo>(id);
    }
}
