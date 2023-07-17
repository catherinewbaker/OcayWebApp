using System;

namespace OcayProject.Models
{
    public class SurveyDto
    {
        public int UserNumber { get; set; }
        public string[] Q1 { get; set; } = new string[4];
        public string[] Q2 { get; set; } = new string[4];
        public string[] Q3 { get; set; } = new string[4];
        public string[] Q4 { get; set; } = new string[4];
        public string[] Q5 { get; set; } = new string[4];
        public string[] Q6 { get; set; } = new string[4];
        public string [] Q7 { get; set; } = new string[4];
        public string [] Q8 { get; set; } = new string[4];
        public string[] Q9 { get; set; } = new string[4];
        public string[] Q10 { get; set; } = new string[4];
        public string[] Q11 { get; set; } = new string[4];
        public int Q12 { get; set; }
        public string Q13 { get; set; } = string.Empty;
    }
}

