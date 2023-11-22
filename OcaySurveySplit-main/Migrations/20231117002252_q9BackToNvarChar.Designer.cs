﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OcayProject.Models;

#nullable disable

namespace OcayProject.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20231117002252_q9BackToNvarChar")]
    partial class q9BackToNvarChar
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("OcayProject.Models.Survey", b =>
                {
                    b.Property<string>("Q1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q10")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q11")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q12")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q13")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q3")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q4")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q5")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q6")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q7")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q8")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Q9")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.ToTable("Survey");
                });

            modelBuilder.Entity("OcayProject.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("ConnectedUsers")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IsPatient")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("LName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SurveyStatus")
                        .HasColumnType("int");

                    b.Property<int>("UserNumber")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
