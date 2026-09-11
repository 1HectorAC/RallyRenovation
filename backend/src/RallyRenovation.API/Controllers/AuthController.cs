
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;

namespace RallyRenovation.API.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager,
     SignInManager<ApplicationUser> signInManager,
     IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        // Validation: compare Password to ConfirmPassword
        if(dto.Password != dto.ConfirmPassword)
            return BadRequest("Password and ConfirmPassword didn't match.");

        // Create a User
        var newUser = new ApplicationUser
        {
            UserName = dto.UserName,
            Email = dto.Email
        };
        var result = await _userManager.CreateAsync(newUser, dto.Password);

        // Validation: for Creating User
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        // Create JWT
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user is null || user.Email == null)
            throw new Exception("");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email)
        };

        var secretKey = _configuration["JWT_SECRET"] ?? throw new InvalidOperationException("Secret Key not found in environment variable.");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { Token = tokenString, user.Email });

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        // Validate: check user
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null || user.Email == null)
            return Unauthorized();

        var check = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
        if (!check.Succeeded)
            return Unauthorized("Invalid Credentials");

        // Create JWT
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email)
        };

        var secretKey = _configuration["JWT_SECRET"] ?? throw new InvalidOperationException("Secret Key not found in environment variable.");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { Token = tokenString, user.Email });
    }
}