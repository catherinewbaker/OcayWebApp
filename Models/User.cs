using System;

namespace OcayProject.Models
{
    public class User
    {
        public int ID { get; set; }
        public int UserNumber { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public string FName { get; set; } = string.Empty;
        public string LName { get; set; } = string.Empty;
        public Boolean IsPatient { get; set; }
        public int SurveyStatus { get; set; }

        // Additional properties for patient-related information
        public string ConnectedUsers { get; set; } = string.Empty;

    }
}



