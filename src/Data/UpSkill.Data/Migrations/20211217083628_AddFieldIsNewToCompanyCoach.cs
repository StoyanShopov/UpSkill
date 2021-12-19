namespace UpSkill.Data.Migrations
{

    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddFieldIsNewToCompanyCoach : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNew",
                table: "CompanyCoaches",
                type: "bit",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNew",
                table: "CompanyCoaches");
        }
    }
}
