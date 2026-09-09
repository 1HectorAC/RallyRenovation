
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.DTO;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public required string Email {get; set;}

    [Required]
    [StringLength(100)]
    public required string UserName {get; set;}

    [Required]
    [StringLength(100)]
    public required string Password {get; set;}
}