using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.DTO;

public class LoginDto
{
    [Required]
    [EmailAddress]
    public required string Email {get; set;}


    [Required]
    [StringLength(100)]
    public required string Password {get; set;}
}