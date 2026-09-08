
using Microsoft.AspNetCore.Identity;

namespace RallyRenovation.API.Models;

public class ApplicationUser: IdentityUser
{
    
    public ICollection<Comment> Comments {get; set;} = [];

    public ICollection<Follow> Followers {get; set;} = [];

    public ICollection<Follow> Following {get; set;} = [];

    public ICollection<Like> Likes {get; set;} = [];

    public ICollection<Renovation> Renovations {get; set;} = [];

    public ICollection<MessageThread> ToMessageThreads {get; set;} = [];

    public ICollection<MessageThread> FromMessageThreads {get; set;} = [];

    public ICollection<Message> Messages {get ; set;} = [];

}