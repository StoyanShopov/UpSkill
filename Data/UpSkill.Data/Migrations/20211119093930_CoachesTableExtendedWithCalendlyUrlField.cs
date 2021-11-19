namespace UpSkill.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class CoachesTableExtendedWithCalendlyUrlField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CalendlyUrl",
                table: "Coaches",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CalendlyUrl",
                table: "Coaches");
        }
    }
}
