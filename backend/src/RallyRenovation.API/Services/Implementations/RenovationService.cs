
using RallyRenovation.API.Data;
using RallyRenovation.API.Models;

namespace RallyRenovation.API.Services.Implementations;

public class RenovationService: IRenovationService
{
    private readonly AppDbContext _context;
    public RenovationService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<Renovation>> GetPublicFilteredRenovations(int page, int pageSize)
    {
        List<Renovation> renovations =
        [
           new Renovation {
                Id = 1, 
                UserId = "1", 
                Title="Big Red Windows", 
                Description="",
                IsPrivate = false,
                TimeStamp = new DateTime(2006, 8, 1)
                },
            new Renovation {
                Id = 1, 
                UserId = "1", 
                Title="Large Granide Kitchen Countertops", 
                Description="",
                IsPrivate = false,
                TimeStamp = new DateTime(2006, 8, 1)} 
        ];

        return renovations;
    }

    public async Task<List<Renovation>> GetFilteredRenovationsByUser(string userId, int page, int pageSize)
    {
        List<Renovation> renovations =
        [
           new Renovation {
                Id = 1, 
                UserId = "1", 
                Title="Big Red Windows", 
                Description="",
                IsPrivate = false,
                TimeStamp = new DateTime(2006, 8, 1)
                },
            new Renovation {
                Id = 1, 
                UserId = "1", 
                Title="Large Granide Kitchen Countertops", 
                Description="",
                IsPrivate = false,
                TimeStamp = new DateTime(2006, 8, 1)} 
        ];

        return renovations;
    }

}