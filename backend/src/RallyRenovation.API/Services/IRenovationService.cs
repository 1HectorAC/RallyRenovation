
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;

namespace RallyRenovation.API.Services;

public interface IRenovationService
{
    Task<List<Renovation>> GetPublicFilteredRenovations(int page, int pageSize);

    Task<List<Renovation>> GetFilteredRenovationsByUser(string userId, int page, int pageSize);

    Task<Renovation> GetRenovation(int id);

    Task AddRenovation(AddRenovationDto dto);

    Task UpdateRenovation(int id, AddRenovationDto dto);

    Task DeleteRenovation(int id);
}