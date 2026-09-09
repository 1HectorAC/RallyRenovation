
using RallyRenovation.API.Data;
using RallyRenovation.API.DTO;
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

    public async Task<Renovation> GetRenovation(int id)
    {
        var renovation = new Renovation {
                Id = 1, 
                UserId = "1", 
                Title="Big Red Windows", 
                Description="",
                IsPrivate = false,
                TimeStamp = new DateTime(2006, 8, 1)
                };
        return renovation;
    }

    public async Task AddRenovation(AddRenovationDto dto)
    {
        if(dto.UserId == null)
            throw new Exception("Error: dto with no userId passed to AddRenovation");

        Renovation renovation = new Renovation
        {
            UserId = dto.UserId,
            Title = dto.Title,
            Description = dto.Description,
            IsPrivate = dto.IsPrivate,
            CatagoryList = dto.CatagoryList,
            Cost = dto.Cost,
            TotalDays = dto.TotalDays,
            Company = dto.Company,
            BeforeImageList = dto.BeforeImageList,
            AfterImageList = dto.AfterImageList,
            TimeStamp = dto.TimeStamp
        };
        await _context.Renovations.AddAsync(renovation);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateRenovation(int id, AddRenovationDto dto)
    {
        
    }

    public async Task DeleteRenovation(int id)
    {
        
    }

}