using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OcayProject.Migrations
{
    /// <inheritdoc />
    public partial class updatedDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhysFName",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "PhysLName",
                table: "User",
                newName: "ConnectedUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConnectedUsers",
                table: "User",
                newName: "PhysLName");

            migrationBuilder.AddColumn<string>(
                name: "PhysFName",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
