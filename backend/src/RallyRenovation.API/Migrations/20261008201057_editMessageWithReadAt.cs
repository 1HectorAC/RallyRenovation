using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RallyRenovation.API.Migrations
{
    /// <inheritdoc />
    public partial class editMessageWithReadAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReadAt",
                table: "Messages",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReadAt",
                table: "Messages");
        }
    }
}
