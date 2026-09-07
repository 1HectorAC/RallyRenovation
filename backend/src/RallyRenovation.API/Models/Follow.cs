
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Follow
{
    public int Id {get; set;}

    [Required]
    public required string FollowerUserId {get; set;}

    // need user Model

    [Required]
    public required string FollowingUserId {get; set;}

    // need user Model

    [Required]
    public DateTime TimeStamp {get; set;}
}