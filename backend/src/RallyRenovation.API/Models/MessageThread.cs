
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class MessageThread
{
    public int Id {get; set;}

    [Required]
    [StringLength(200)]
    public required string Title {get; set;}

    [Required]
    public required string ToUserId {get; set;}

    public ApplicationUser? ToUser {get; set;}

    [Required]
    public required string FromUserId {get; set;}

    public ApplicationUser? FromUser {get; set;}

    [Required]
    public DateTime TimeStamp {get; set;}

    public ICollection<Message> Messages {get; set;} = [];
    
}