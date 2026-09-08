
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Message
{
    public int Id {get; set;}

    [Required]
    [StringLength(2000)]
    public required string Body {get; set;}

    [Required]
    public required string SenderUserId {get; set;}

    public ApplicationUser? SenderUser {get; set;}

    [Required]
    public int MessageThreadId {get; set;}

    public MessageThread? MessageThread {get; set;}

    [Required]
    public DateTime TimeStamp {get; set;}
}