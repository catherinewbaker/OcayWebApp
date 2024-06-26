﻿using System;
using OcayProject.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Azure.Core;
using Microsoft.Data.SqlClient;
using System.Diagnostics.Tracing;

namespace OcayProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _userContext;

        public AuthController(UserContext userContext)
        {
            _userContext = userContext;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var checkEmail = await _userContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (checkEmail != null)
            {
                return BadRequest("Email is already used.");
            }

            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.FName) || string.IsNullOrEmpty(request.LName))
            {
                return BadRequest("Please fill in all the fields");
            }

            if (string.IsNullOrEmpty(request.Password) || request.Password.Length < 8 || !Regex.IsMatch(request.Password, "[A-Z]"))
            {
                // Password is weak or not provided
                return BadRequest("Password must be at least 8 characters long and contain at least one uppercase letter.");
            }

            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(request.Password);

            Random random = new Random();
            int randomNumber = 0;

            var isDuplicate = true;
            while (isDuplicate)
            {
                randomNumber = random.Next(10000000, 99999999);
                var checkID = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == randomNumber);
                isDuplicate = checkID != null;
            }

            User user = new User
            {
                UserNumber = randomNumber,
                Email = request.Email,
                PasswordHash = passwordHash,
                FName = request.FName,
                LName = request.LName,
                IsPatient = request.IsPatient,
                SurveyStatus = request.SurveyStatus,

            };

            if (request.IsPatient == '1')
            {
                // Create a new table for the user only if isPatient is true
                await _userContext.Database.ExecuteSqlRawAsync(
                    $"CREATE TABLE [User_{user.UserNumber}] (" +
                    "Timestamp DATETIME DEFAULT GETDATE(), " +
                    "Q1 NVARCHAR(MAX), " +
                    "Q2 NVARCHAR(MAX), " +
                    "Q3 NVARCHAR(MAX), " +
                    "Q4 NVARCHAR(MAX), " +
                    "Q5 NVARCHAR(MAX), " +
                    "Q6 NVARCHAR(MAX), " +
                    "Q7 NVARCHAR(MAX), " +
                    "Q8 NVARCHAR(MAX), " +
                    "Q9 NVARCHAR(MAX), " +
                    "Q10 NVARCHAR(MAX), " +
                    "Q11 NVARCHAR(MAX), " +
                    "Q12 NVARCHAR(MAX), " +
                    "Q13 NVARCHAR(MAX), " +
                    "Score INT, " +
                    ");"
                );
            }

            _userContext.User.Add(user);
            await _userContext.SaveChangesAsync();

            return Ok(new
            {
                userNumber = user.UserNumber,
                email = user.Email,
                isPatient = user.IsPatient,
                fName = user.FName,
                lName = user.LName
            }); ;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDto request)
        {
            // Retrieve the user from the database based on the provided username
            var user = await _userContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Please check your email or password.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Please check your email or password.");
            }



            return Ok(new
            {
                userNumber = user.UserNumber,
                email = user.Email,
                isPatient = user.IsPatient,
                fName = user.FName,
                lName = user.LName
            });
        }

        [HttpPost("changePassword")]
        public async Task<ActionResult<User>> ChangePassword(LoginDto request)
        {
            // Retrieve the user from the database based on the provided username
            var user = await _userContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Please check your email address.");
            }

            if (string.IsNullOrEmpty(request.Password) || request.Password.Length < 8 || !Regex.IsMatch(request.Password, "[A-Z]"))
            {
                // Password is weak or not provided
                return BadRequest("Password must be at least 8 characters long and contain at least one uppercase letter.");
            }

            var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Update the PasswordHash property of the user object
            user.PasswordHash = newPasswordHash;

            // Save changes to the database
            await _userContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("checkEmail")]
        public async Task<ActionResult<User>> CheckEmail(EmailDto request)
        {
            // Retrieve the user from the database based on the provided username
            var user = await _userContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("We could not find an account with your email address.");
            }

            return Ok();
        }

        [HttpPost("postSurvey")]
        public async Task<IActionResult> PostSurvey(SurveyDto request)
        {
            try
            {
                // score algorithm here
                decimal score = 0;
                string q1 = "";
                string q2 = "";
                string q3 = "";
                string q4 = "";
                string q5 = "";
                string q6 = "";
                string q7 = "";
                string q8 = "";
                string q9 = "";
                string q10 = "";
                string q11 = "";


                Dictionary<string, decimal> q1map = new Dictionary<string, decimal>()
                {
                    { "Happy", 3m },
                    { "Sad", -2.33m },
                    { "Fear", -2.34m },
                    { "Anger", -2.33m },
                    { "I do not wish to answer.", -7m }
                };

                score += 7m;

                foreach (string answer in request.Q1)
                {
                    if (q1map.ContainsKey(answer))
                    {
                        score += q1map[answer];
                        q1 += answer + ";";
                    }
                }

                Dictionary<string, decimal> q2map = new Dictionary<string, decimal>()
                {
                    { "Nauseous", -2.25m },
                    { "Fatigue", -2.25m },
                    { "Shortness of breath", -2.25m },
                    { "Fever", -2.25m },
                    { "I do not wish to answer.", -10m }
                };

                score += 10m;

                foreach (string answer in request.Q2)
                {
                    if (q2map.ContainsKey(answer))
                    {
                        score += q2map[answer];
                        q2 += answer + ";";
                    }
                }


                Dictionary<string, decimal> q3map = new Dictionary<string, decimal>()
                {
                    { "Anxious", -2.5m },
                    { "Scared", -2.5m },
                    { "Ready", 2.25m },
                    { "Supported", 2.25m },
                    { "I do not wish to answer.", -5m }
                };

                score += 5m;

                foreach (string answer in request.Q3)
                {
                    if (q3map.ContainsKey(answer))
                    {
                        score += q3map[answer];
                        q3 += answer + ";";
                    }
                }

                Dictionary<string, decimal> q4map = new Dictionary<string, decimal>()
                {
                    { "Once a day", 3.33m },
                    { "Twice a day", 6.67m },
                    { "Three times a day", 10m },
                    { "More than three times a day", 6.67m },
                    { "I do not wish to answer.", 0m }
                };


                foreach (string answer in request.Q4)
                {
                    if (q4map.ContainsKey(answer))
                    {
                        score += q4map[answer];
                        q4 += answer;
                    }
                }

                Dictionary<string, decimal> q5map = new Dictionary<string, decimal>()
                {
                    { "No", 10m },
                    { "Sometimes", 6.67m },
                    { "Many times", 3.33m },
                    { "Yes", 0m },
                    { "I do not wish to answer.", 0m }
                };

                foreach (string answer in request.Q5)
                {
                    if (q5map.ContainsKey(answer))
                    {
                        score += q5map[answer];
                        q5 += answer;
                    }
                }

                Dictionary<string, decimal> q6map = new Dictionary<string, decimal>()
                {
                    { "Confused", -2.5m },
                    { "Confident", 2.5m },
                    { "Bored", -2.25m },
                    { "Excited", 2.25m },
                    { "I do not wish to answer.", -5m }
                };

                score += 5m;

                foreach (string answer in request.Q6)
                {
                    if (q6map.ContainsKey(answer))
                    {
                        score += q6map[answer];
                        q6 += answer + ";";
                    }
                }

                Dictionary<string, decimal> q7map = new Dictionary<string, decimal>()
                {
                    { "Yes", 10m },
                    { "Maybe", 5m },
                    { "No", 0m },
                    { "I don't know", 3m },
                    { "I do not wish to answer.", 0m }
                };

                foreach (string answer in request.Q7)
                {
                    if (q7map.ContainsKey(answer))
                    {
                        score += q7map[answer];
                        q7 += answer;
                    }
                }

                foreach (string answer in request.Q8)
                {
                    if (q7map.ContainsKey(answer))
                    {
                        score += q7map[answer];
                        q8 += answer;
                    }
                }

                Dictionary<string, decimal> q9map = new Dictionary<string, decimal>()
                {
                    { "Joy", 3m },
                    { "Sad", -3.33m },
                    { "Fear", -3.34m },
                    { "Anger", -3.33m },
                    { "I do not wish to answer.", -7m }
                };

                score += 7m;

                foreach (string answer in request.Q9)
                {
                    if (q9map.ContainsKey(answer))
                    {
                        score += q9map[answer];
                        q9 += answer + ";";
                    }
                }

                Dictionary<string, decimal> q10map = new Dictionary<string, decimal>()
                {
                    { "Eager", 3m },
                    { "Sad", -3.33m },
                    { "Reluctant", -3.34m },
                    { "Anger", -3.33m },
                    { "I do not wish to answer.", -7m }
                };

                score += 7m;

                foreach (string answer in request.Q10)
                {
                    if (q10map.ContainsKey(answer))
                    {
                        score += q10map[answer];
                        q10 += answer + ";";
                    }
                }

                Dictionary<string, decimal> q11map = new Dictionary<string, decimal>()
                {
                    { "Yes", 10m },
                    { "Most of the week", 6.67m },
                    { "Less than half of the week", 3.33m },
                    { "Never", 0m },
                    { "I do not wish to answer.", 0m }
                };

                foreach (string answer in request.Q11)
                {
                    if (q11map.ContainsKey(answer))
                    {
                        score += q11map[answer];
                        q11 += answer;
                    }
                }

                score += (decimal)(11 - request.Q12);

                int finalScore = (int)Math.Round(score) - 9;


                await _userContext.Database.ExecuteSqlRawAsync(
                    $"INSERT INTO [User_{request.UserNumber}] (Timestamp, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Score) " +
                    "VALUES (GETDATE(), {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12}, {13});",
                    q1, q2, q3, q4, q5, q6,
                    q7, q8, q9, q10, q11, request.Q12,
                    request.Q13, finalScore
                );

                return Ok(finalScore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occured while submitting the survey: {ex.Message} ");
            }
        }

        
        [HttpPost("getAllResults")]
        public async Task<IActionResult> GetAllResults(ResultDto request)
        {
            try
            {
                var data = await _userContext.Set<Survey>()
                    .FromSqlRaw($"SELECT Timestamp, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Score FROM [User_{request.UserNumber}]")
                    .OrderByDescending(survey => survey.Timestamp) // Order by Timestamp in descending order
                    .ToListAsync();

                // Calculate average monthly scores
                var averageMonthlyScores = data
                    .GroupBy(survey => survey.Timestamp.Month)
                    .Select(group => new
                    {
                        Month = group.Key,
                        AverageScore = Convert.ToInt32(group.Average(survey => survey.Score))
                    })
                    .ToList();

                // Create the userSurveys list with modified timestamp and split values
                var userSurveys = data.Select(survey => new
                {
                    timestamp = survey.Timestamp.Date.ToString("yyyy-MM-dd"),
                    q1 = survey.Q1.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q2 = survey.Q2.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q3 = survey.Q3.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q4 = survey.Q4.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q5 = survey.Q5.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q6 = survey.Q6.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q7 = survey.Q7.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q8 = survey.Q8.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q9 = survey.Q9.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q10 = survey.Q10.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q11 = survey.Q11.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q12 = survey.Q12,
                    q13 = survey.Q13,
                    score = survey.Score
                }).ToList();

                return Ok(new { userSurveys, averageMonthlyScores });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the survey data: {ex.Message}");
            }
        }

        [HttpPost("getResultsByDate")]
        public async Task<IActionResult> GetResultsByDate(DateRangeDto request)
        {
            try
            {
                DateTime startDate = DateTime.Parse(request.StartDate);
                DateTime endDate = DateTime.Parse(request.EndDate);

                var data = await _userContext.Set<Survey>()
                    .FromSqlRaw($"SELECT Timestamp, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Score FROM [User_{request.UserNumber}]")
                    .Where(survey => survey.Timestamp >= startDate && survey.Timestamp < endDate.AddDays(1))
                    .OrderBy(survey => survey.Timestamp) // Order by Timestamp from start date to end date
                    .ToListAsync();

                // Create the userSurveys list with modified timestamp and split values
                var userSurveys = data.Select(survey => new
                {
                    timestamp = survey.Timestamp.Date.ToString("yyyy-MM-dd"),
                    q1 = survey.Q1.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q2 = survey.Q2.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q3 = survey.Q3.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q4 = survey.Q4.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q5 = survey.Q5.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q6 = survey.Q6.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q7 = survey.Q7.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q8 = survey.Q8.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q9 = survey.Q9.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q10 = survey.Q10.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q11 = survey.Q11.TrimEnd(';').Split(';', StringSplitOptions.RemoveEmptyEntries),
                    q12 = survey.Q12,
                    q13 = survey.Q13,
                    score = survey.Score
                }).ToList();

                return Ok(new { userSurveys });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the survey data: {ex.Message}");
            }
        }

        [HttpPost("getScore")]
        public async Task<IActionResult> GetScore(getScoreDto request)
        {
            try
            {
                
                var userScores = new List<int>();

                // Loop through each user ID in the input array
                foreach (var userId in request.IdArray)
                {
                    var data = await _userContext.Set<Survey>()
                        .FromSqlRaw($"SELECT Timestamp, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Score FROM [User_{userId}]")
                        .OrderByDescending(survey => survey.Timestamp)
                        .FirstOrDefaultAsync(); // only getting the very first row

                    // If data is NOT null add the score to the list
                    if (data == null)
                    {
                        userScores.Add(-1);
                    }
                    else
                    {
                        userScores.Add(data.Score);
                    }
                }

                return Ok(new { userScores });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the survey data: {ex.Message}");
            }
        }

        [HttpPost("connectPhysician")]
        public async Task<IActionResult> ConnectPhysician(ConnectDto request)
        {
            try
            {
                var physicianUser = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == request.PhysicianUserNumber);
                if (physicianUser == null || physicianUser.IsPatient == '1')
                {
                    
                    return BadRequest("Please check your connection's ID number.");
                }

                string patientNum = request.PatientUserNumber.ToString();
                string physicianNum = request.PhysicianUserNumber.ToString();

                var patientUser = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == request.PatientUserNumber);

                if (patientUser != null && !IsAlreadyConnected(patientUser, physicianNum))
                {
                    await _userContext.Database.ExecuteSqlRawAsync(
                        $"UPDATE [User] SET ConnectedUsers = ISNULL(ConnectedUsers, '') + '{physicianNum};' " +
                        $"WHERE UserNumber = {request.PatientUserNumber};"
                    );
                }
                else
                {
                    return BadRequest("This user is already connected.");
                }

                if (physicianUser != null && !IsAlreadyConnected(physicianUser, patientNum))
                {
                    await _userContext.Database.ExecuteSqlRawAsync(
                        $"UPDATE [User] SET ConnectedUsers = ISNULL(ConnectedUsers, '') + '{patientNum};' " +
                        $"WHERE UserNumber = {request.PhysicianUserNumber};"
                    );
                }
                else
                {
                    return BadRequest("This user is already connected.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private bool IsAlreadyConnected(User user, string numToCheck)
        {
            if (!string.IsNullOrEmpty(user.ConnectedUsers))
            {
                return user.ConnectedUsers.Split(';').Contains(numToCheck);
            }
            return false;
        }


        [HttpPost("disconnectPhysician")]
        public async Task<IActionResult> DisconnectPhysician(ConnectDto request)
        {
            try
            {
                var patientUser = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == request.PatientUserNumber);
                var physicianUser = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == request.PhysicianUserNumber);

                if (patientUser == null || physicianUser == null)
                {
                    return BadRequest("Invalid patient or physician ID number.");
                }

                string patientNumString = request.PatientUserNumber.ToString();
                string physicianNumString = request.PhysicianUserNumber.ToString();

                // Remove the physicianNum from the patient's ConnectedUsers column
                if (!string.IsNullOrEmpty(patientUser.ConnectedUsers))
                {
                    patientUser.ConnectedUsers = patientUser.ConnectedUsers.Replace(physicianNumString + ";", "");
                    await _userContext.SaveChangesAsync();
                }

                // Remove the patientNum from the physician's ConnectedUsers column
                if (!string.IsNullOrEmpty(physicianUser.ConnectedUsers))
                {
                    physicianUser.ConnectedUsers = physicianUser.ConnectedUsers.Replace(patientNumString + ";", "");
                    await _userContext.SaveChangesAsync();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("deleteAccount")]
        public async Task<IActionResult> DeleteAccount(ResultDto request)
        {
            try
            {
                var data = await _userContext.User
                    .Where(u => u.UserNumber == request.UserNumber)
                    .Select(u => u.ConnectedUsers)
                    .FirstOrDefaultAsync();

                if (data == null)
                {
                    return NotFound("User not found.");
                }

                string[] connectedUsersArray = data.Split(';', StringSplitOptions.RemoveEmptyEntries);

                foreach (var connectedUserNumber in connectedUsersArray)
                {
                    int userNumber = int.Parse(connectedUserNumber);
                    var user = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == userNumber);
                    if (user != null)
                    {
                        // Replace the request.UserNumber with an empty string in the ConnectedUsers column
                        user.ConnectedUsers = user.ConnectedUsers.Replace(request.UserNumber.ToString() + ";", "");
                    }
                }

                await _userContext.SaveChangesAsync();

                string tableName = $"User_{request.UserNumber}";
                await _userContext.Database.ExecuteSqlRawAsync($"DROP TABLE {tableName}");

                var userToDelete = await _userContext.User.FirstOrDefaultAsync(u => u.UserNumber == request.UserNumber);
                if (userToDelete != null)
                {
                    _userContext.User.Remove(userToDelete);
                    await _userContext.SaveChangesAsync();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }




        [HttpPost("loadConnections")]
        public async Task<IActionResult> LoadConnections(ResultDto request)
        {
            try
            {
                var userNum = request.UserNumber;

                var data = await _userContext.User
                    .Where(u => u.UserNumber == userNum)
                    .Select(u => u.ConnectedUsers)
                    .FirstOrDefaultAsync();

                if (data == null)
                {
                    return NotFound("User not found.");
                }

                string[] connectedUsersArray = data.Split(';', StringSplitOptions.RemoveEmptyEntries);
                Dictionary<int, string> outputDict = new Dictionary<int, string>();

                foreach (string connectedUser in connectedUsersArray)
                {
                    if (int.TryParse(connectedUser, out int connectedUserNum))
                    {
                        var nameData = await _userContext.User
                            .Where(u => u.UserNumber == connectedUserNum)
                            .Select(u => u.FName + " " + u.LName)
                            .FirstOrDefaultAsync();

                        if (nameData != null)
                        {
                            outputDict.Add(connectedUserNum, nameData);
                        }
                    }
                }

                return Ok(new { ConnectedUsers = outputDict });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        //private string CreateToken(User user)
        //{
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, user.Username)
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
        //        _configuration.GetSection("Jwt:Token").Value!));

        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var token = new JwtSecurityToken(
        //            claims: claims,
        //            expires: DateTime.Now.AddYears(1),
        //            signingCredentials: creds
        //        );

        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        //    return jwt;
        //}
    }
}
