using Microsoft.EntityFrameworkCore.Migrations;

namespace UpSkill.Data.Migrations
{
    public partial class CompanyCoursesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Courses_CourseId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_CourseId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Companies");

            migrationBuilder.CreateTable(
                name: "CompanyCourses",
                columns: table => new
                {
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyCourses", x => new { x.CompanyId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_CompanyCourses_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyCourses_CourseId",
                table: "CompanyCourses",
                column: "CourseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyCourses");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Companies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_CourseId",
                table: "Companies",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Courses_CourseId",
                table: "Companies",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
