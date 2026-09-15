
using RallyRenovation.API.Models;

namespace RallyRenovation.API.DTO;

public class RenovationLongDto
{
     public int Id {get; set;}

    public required string UserId {get; set;}

    public required string OwnerName {get; set;}

    public required string Title {get; set;}

    public required string Description {get; set;}

    public bool IsPrivate {get; set;}

    public string? CatagoryList {get; set;}
    
    public int? Cost {get; set;}

    public int? TotalDays {get; set;}

    public string? Company {get; set;}

    public string? Location {get; set;}

    public string? BeforeImageList {get; set;}

    public string? AfterImageList {get; set;}

    // consider just string of current day
    public required string Date {get; set;}

    public List<RenovationCommentDto> Comments {get; set;} = [];

    public int TotalLikes {get; set;}

    public bool AccessedByOwner {get; set;}
}