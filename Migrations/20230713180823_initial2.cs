using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OcayProject.Migrations
{
    /// <inheritdoc />
    public partial class initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Survey",
                columns: table => new
                {
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Q1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q3 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q4 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q5 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q6 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q7 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q8 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q9 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q10 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q11 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q12 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Q13 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Survey");
        }
    }
}
