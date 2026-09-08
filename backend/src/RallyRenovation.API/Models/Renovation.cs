
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Renovation
{
    public int Id {get; set;}

    [Required]
    public required string UserId {get; set;}

    public ApplicationUser? User {get; set;}

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
    public required DateTime TimeStamp {get; set;}

    ICollection<Comment> Comments {get; set;} = [];

    ICollection<Like> Likes {get; set;} = [];
}