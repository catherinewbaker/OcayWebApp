using System;

namespace OcayProject.Models
{
    public class UserDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FName { get; set; }
        public required string LName { get; set; }
        public required bool IsPatient { get; set; }
        public required int SurveyStatus { get; set; }

    }
}
