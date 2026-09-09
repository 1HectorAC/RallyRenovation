
using RallyRenovation.API.Models;

namespace RallyRenovation.API.Services;

public interface IRenovationService
{
    Task<List<Renovation>> GetPublicFilteredRenovations(int page, int pageSize);

    Task<List<Renovation>> GetFilteredRenovationsByUser(string userId, int page, int pageSize);

}