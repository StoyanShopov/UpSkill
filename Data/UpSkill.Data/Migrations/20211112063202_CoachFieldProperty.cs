using Microsoft.EntityFrameworkCore.Migrations;

namespace UpSkill.Data.Migrations
{
    public partial class CoachFieldProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserCourse");

            migrationBuilder.AddColumn<string>(
                name: "Field",
                table: "Coaches",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Field",
                table: "Coaches");

            migrationBuilder.CreateTable(
                name: "ApplicationUserCourse",
                columns: table => new
                {
                    CoursesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserCourse", x => new { x.CoursesId, x.UsersId });
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserCourse_UsersId",
                table: "ApplicationUserCourse",
                column: "UsersId");
        }
    }
}
