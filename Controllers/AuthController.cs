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
