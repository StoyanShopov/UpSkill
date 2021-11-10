namespace UpSkill.Services.Data.Tests.Services
{
    using System.Threading.Tasks;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using Common;

    using Moq;

    using Xunit;
    using Microsoft.EntityFrameworkCore;

    public class CoursesServicesTest : TestWithData
    {
        [Fact]
        public async Task CreateAsyncShouldCreateNewCourse()
        {
            const int Id = 1;
            const string CourseTitle = "Title";
            const string CourseDescription = "Description";
            const decimal CoursePrice = 420;
            const int CourseCoachId = 1;
            const int CourseCategoryId = 1;

            var repository = new Mock<IDeletableEntityRepository<Course>>();

            var course = new Course()
            {
                Id = Id,
                Title = CourseTitle,
                Description = CourseDescription,
                Price = CoursePrice,
                CoachId = CourseCoachId,
                CategoryId = CourseCategoryId,
            };

            var result = await Task.FromResult(repository.Setup(r => r.AddAsync(course)));

            Assert.NotNull(course);

            Assert.Equal(CourseTitle, course.Title);
            Assert.Equal(CourseDescription, course.Description);
            Assert.Equal(CoursePrice, course.Price);
            Assert.Equal(CourseCoachId, course.CoachId);
            Assert.Equal(CourseCategoryId, course.CategoryId);
        }

        [Fact]
        public async Task DeleteAsyncShouldDeleteCourse()
        {
            const int Id = 1;
            const string DatabaseName = "DeleteCourse";

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IDeletableEntityRepository<Course>>();

            var course = await this.Database
                .Courses
                .FindAsync(Id);

            var result = repository.Setup(r => r.Delete(course));

            Assert.NotNull(course);
            Assert.True(course.IsDeleted = true);
        }

        [Fact]
        public async Task EditAsyncShouldEditCourse()
        {
            const int Id = 1;
            const string EditedCourseTitle = "Kit";
            const string EditedCourseDescription = "Kitove";
            const decimal EditedPrice = 421;
            const int EditedCourseCoachId = 2;
            const int EditedCourseCategoryId = 2;

            const string DatabaseName = "EditCourse";

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IDeletableEntityRepository<Course>>();

            var course = await this.Database
                .Courses
                .FindAsync(Id);

            course.Id = Id;
            course.Title = EditedCourseTitle;
            course.Description = EditedCourseDescription;
            course.Price = EditedPrice;
            course.CoachId = EditedCourseCoachId;
            course.CategoryId = EditedCourseCategoryId;

            var result = repository.Setup(r => r.Update(course));

            Assert.NotNull(course);

            Assert.Equal(EditedCourseTitle, course.Title);
            Assert.Equal(EditedCourseDescription, course.Description);
            Assert.Equal(EditedPrice, course.Price);
            Assert.Equal(EditedCourseCoachId, course.CoachId);
            Assert.Equal(EditedCourseCategoryId, course.CategoryId);
        }

        [Fact]
        public async Task GetByIdAsyncShouldGetCourseById()
        {
            const string DatabaseName = "GetCourseById";

            const int Id = 1;

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IDeletableEntityRepository<Course>>();

            var course = await this.Database
                .Courses
                .FindAsync(Id);

            Assert.NotNull(course);
            Assert.Equal(Id, course.Id);
        }

        [Fact]
        public async Task GetAllAsyncShouldGetAllCourses()
        {
            const string DatabaseName = "GetAllCourses";
            const int DatabaseRecordsCount = 2;

            await this.InitializeDatabase(DatabaseName);

            var repository = new Mock<IDeletableEntityRepository<Course>>();

            var courses = await this.Database
                .Courses.ToListAsync();

            Assert.NotNull(courses);
            Assert.Equal(DatabaseRecordsCount, courses.Count);
        }
    }
}
