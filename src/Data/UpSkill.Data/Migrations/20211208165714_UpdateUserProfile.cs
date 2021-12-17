namespace UpSkill.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class UpdateUserProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoFilePath",
                table: "UserProfiles");

            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "UserProfiles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_FileId",
                table: "UserProfiles",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_Files_FileId",
                table: "UserProfiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_Files_FileId",
                table: "UserProfiles");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_FileId",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "UserProfiles");

            migrationBuilder.AddColumn<string>(
                name: "PhotoFilePath",
                table: "UserProfiles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
