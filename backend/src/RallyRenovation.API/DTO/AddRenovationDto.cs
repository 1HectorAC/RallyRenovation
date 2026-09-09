using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.DTO;

public class AddRenovationDto
{
    public string? UserId {get; set;}

    [Required]
    [StringLength(200)]
    public required string Title {get; set;}

    [Required]
    [StringLength(2000)]
    public required string Description {get; set;}

    public bool IsPrivate {get; set;} = true;

    [StringLength(1000)]
    public string? CatagoryList {get; set;}
    
    [Range(0, 1000000000)]
    public int? Cost {get; set;}

    [Range(0, 10000)]
    public int? TotalDays {get; set;}

    [StringLength(200)]
    public string? Company {get; set;}

    [StringLength(200)]
    public string? Location {get; set;}

    [StringLength(10000)]
    public string? BeforeImageList {get; set;}

    [StringLength(10000)]
    public string? AfterImageList {get; set;}

    [Required]
    public required DateTime TimeStamp {get; set;} = DateTime.UtcNow;

}