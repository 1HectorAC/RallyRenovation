
namespace RallyRenovation.API.DTO;

public class RenovationShortDto
{

    public int Id {get; set;}

    public required string Title {get; set;}

    public required string Description {get; set;}

    public required string OwnerName {get; set;}

    public string? CatagoryList {get; set;}

}