using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OcayProject.Migrations
{
    /// <inheritdoc />
    public partial class isPatientUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IsPatient",
                table: "User",
                type: "nvarchar(1)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "char(10)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IsPatient",
                table: "User",
                type: "char(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1)");
        }
    }
}
