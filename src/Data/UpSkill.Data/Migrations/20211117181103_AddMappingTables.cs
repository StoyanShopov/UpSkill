namespace UpSkill.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddMappingTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseLecture_Courses_CoursesId",
                table: "CourseLecture");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseLecture_Lectures_LecturesId",
                table: "CourseLecture");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureLesson_Lectures_LecturesId",
                table: "LectureLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureLesson_Lessons_LessonsId",
                table: "LectureLesson");

            migrationBuilder.DropIndex(
                name: "IX_LectureLesson_LessonsId",
                table: "LectureLesson");

            migrationBuilder.DropIndex(
                name: "IX_CourseLecture_LecturesId",
                table: "CourseLecture");

            migrationBuilder.AddColumn<int>(
                name: "LectureId",
                table: "Lessons",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LectureId",
                table: "LectureLesson",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonId",
                table: "LectureLesson",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "CourseLecture",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LectureId",
                table: "CourseLecture",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_LectureId",
                table: "Lessons",
                column: "LectureId");

            migrationBuilder.CreateIndex(
                name: "IX_LectureLesson_LectureId",
                table: "LectureLesson",
                column: "LectureId");

            migrationBuilder.CreateIndex(
                name: "IX_LectureLesson_LessonId",
                table: "LectureLesson",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLecture_CourseId",
                table: "CourseLecture",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLecture_LectureId",
                table: "CourseLecture",
                column: "LectureId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLecture_Courses_CourseId",
                table: "CourseLecture",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLecture_Lectures_LectureId",
                table: "CourseLecture",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureLesson_Lectures_LectureId",
                table: "LectureLesson",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureLesson_Lessons_LessonId",
                table: "LectureLesson",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Lectures_LectureId",
                table: "Lessons",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseLecture_Courses_CourseId",
                table: "CourseLecture");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseLecture_Lectures_LectureId",
                table: "CourseLecture");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureLesson_Lectures_LectureId",
                table: "LectureLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureLesson_Lessons_LessonId",
                table: "LectureLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Lectures_LectureId",
                table: "Lessons");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_LectureId",
                table: "Lessons");

            migrationBuilder.DropIndex(
                name: "IX_LectureLesson_LectureId",
                table: "LectureLesson");

            migrationBuilder.DropIndex(
                name: "IX_LectureLesson_LessonId",
                table: "LectureLesson");

            migrationBuilder.DropIndex(
                name: "IX_CourseLecture_CourseId",
                table: "CourseLecture");

            migrationBuilder.DropIndex(
                name: "IX_CourseLecture_LectureId",
                table: "CourseLecture");

            migrationBuilder.DropColumn(
                name: "LectureId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "LectureId",
                table: "LectureLesson");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "LectureLesson");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "CourseLecture");

            migrationBuilder.DropColumn(
                name: "LectureId",
                table: "CourseLecture");

            migrationBuilder.CreateIndex(
                name: "IX_LectureLesson_LessonsId",
                table: "LectureLesson",
                column: "LessonsId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLecture_LecturesId",
                table: "CourseLecture",
                column: "LecturesId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLecture_Courses_CoursesId",
                table: "CourseLecture",
                column: "CoursesId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLecture_Lectures_LecturesId",
                table: "CourseLecture",
                column: "LecturesId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureLesson_Lectures_LecturesId",
                table: "LectureLesson",
                column: "LecturesId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureLesson_Lessons_LessonsId",
                table: "LectureLesson",
                column: "LessonsId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
