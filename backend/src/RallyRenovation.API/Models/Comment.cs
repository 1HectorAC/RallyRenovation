
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
    public required string CommenterId {get; set;}

    // Reference userId in User Table

    public DateTime TimeStamp {get; set;}
}