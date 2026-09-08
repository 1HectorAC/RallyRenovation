
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Comment
{
    public int Id {get; set;}

    [Required]
    public int RenovationId {get; set;}

    public Renovation? Renovation {get; set;}

    [Required]
    [StringLength(2000)]
    public required string CommentText {get; set;}

    [Required]
    public required string UserId {get; set;}

    public ApplicationUser? User {get; set;}

    [Required]
    public DateTime TimeStamp {get; set;}
}