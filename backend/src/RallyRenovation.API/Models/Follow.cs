
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Follow
{
    public int Id {get; set;}

    [Required]
    public required string FollowerUserId {get; set;}

    public ApplicationUser? FollowerUser {get; set;}

    [Required]
    public required string FollowingUserId {get; set;}

    public ApplicationUser? FollowingUser {get; set;}

    [Required]
    public DateTime TimeStamp {get; set;}
}