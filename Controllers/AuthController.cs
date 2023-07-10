using System;
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

            if (request.IsPatient == true)
            {
                if(string.IsNullOrEmpty(request.PhysFName) || string.IsNullOrEmpty(request.PhysLName))
                {
                    return BadRequest("Please enter your physician's information");
                }
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
                PhysFName = request.PhysFName,
                PhysLName = request.PhysLName
            };

            if (request.IsPatient)
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
                    "Score NVARCHAR(MAX), " +
                    ");"
                );
            }

            _userContext.User.Add(user);
            await _userContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDto request)
        {
            // Retrieve the user from the database based on the provided username
            var user = await _userContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password.");
            }

            return Ok(user);
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
                
                foreach (string answer in request.Q1)
                {
                    score += 7m;
                    if (answer == "Happy")
                    {
                        score += 3m;
                        q1 += "Happy ";

                    }
                    else if (answer == "Sad")
                    {
                        score -= 2.33m;
                        q1 += "Sad ";
                    }
                    else if (answer == "Fear")
                    {
                        score -= 2.34m;
                        q1 += "Fear ";
                    }
                    else if (answer == "Anger")
                    {
                        score -= 2.33m;
                        q1 += "Anger ";
                    }
                    else if (answer == "I do not wish to answer.")
                    {
                        score -= 7m;
                        q1 += "I do not wish to answer.";
                    }
                }

                foreach (string answer in request.Q2)
                {
                    score += 10m;
                    if (answer == "Nauseous")
                    {
                        score -= 2.25m;
                        q2 += "Nauseous ";

                    }
                    else if (answer == "Fatigue")
                    {
                        score -= 2.25m;
                        q2 += "Fatigue ";
                    }
                    else if (answer == "Shortness of breath")
                    {
                        score -= 2.25m;
                        q2 += "Shortness of breath ";
                    }
                    else if (answer == "Fever")
                    {
                        score -= 2.25m;
                        q2 += "Fever ";
                    }
                    else if (answer == "I do not wish to answer.")
                    {
                        score -= 10m;
                        q2 += "I do not wish to answer.";
                    }
                }

                await _userContext.Database.ExecuteSqlRawAsync(
                    $"INSERT INTO [User_{request.UserNumber}] (Timestamp, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Score) " +
                    "VALUES (GETDATE(), {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12}, {13});",
                    q1, q2, request.Q3, request.Q4, request.Q5, request.Q6,
                    request.Q7, request.Q8, request.Q9, request.Q10, request.Q11, request.Q12,
                    request.Q13, score
                );

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occured while submitting the survey.");
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
