
using System.ComponentModel.DataAnnotations;

namespace RallyRenovation.API.Models;

public class Like
{
    public int Id {get; set;}

    [Required]
    public required string UserId {get; set;}

    [Required]
    public int RenovationId {get; set;}

    public Renovation? Renovation {get; set;}

    public DateTime TimeStamp {get; set;}
}