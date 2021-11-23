using Microsoft.EntityFrameworkCore.Migrations;

namespace UpSkill.Data.Migrations
{
    public partial class CoachFieldProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserCourse_UsersId",
                table: "ApplicationUserCourse",
                column: "UsersId");
        }
    }
}
