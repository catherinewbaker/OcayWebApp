using System;

namespace OcayProject.Models
{
    public class Survey
    {
        public DateTime Timestamp { get; set; }
        public string Q1 { get; set; } = string.Empty;
        public string Q2 { get; set; } = string.Empty;
        public string Q3 { get; set; } = string.Empty;
        public string Q4 { get; set; } = string.Empty;
        public string Q5 { get; set; } = string.Empty;
        public string Q6 { get; set; } = string.Empty;
        public string Q7 { get; set; } = string.Empty;
        public string Q8 { get; set; } = string.Empty;
        public string Q9 { get; set; } = string.Empty;
        public string Q10 { get; set; } = string.Empty;
        public string Q11 { get; set; } = string.Empty;
        public int Q12 { get; set; }
        public string Q13 { get; set; } = string.Empty;
        public int Score { get; set; }
    }
}

