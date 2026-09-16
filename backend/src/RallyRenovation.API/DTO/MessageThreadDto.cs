
namespace RallyRenovation.API.DTO;

public class MessageThreadDto
{
    public int ThreadId {get; set;}
    public required string FromUserName {get; set;}

    public required string Title {get; set;}

    public required string Date {get; set;}

}