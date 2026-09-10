
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;
using RallyRenovation.API.Utilities;

namespace RallyRenovation.API.Services;

public interface IRenovationService
{
    Task<Result<List<Renovation>>> GetPublicFilteredRenovations(int page, int pageSize);

    Task<Result<List<Renovation>>> GetFilteredRenovationsByUser(string userId, int page, int pageSize);

    Task<Result<Renovation>> GetRenovation(int id);

    Task<Result> AddRenovation(AddRenovationDto dto);

    Task<Result> UpdateRenovation(int id, AddRenovationDto dto);

    Task<Result> DeleteRenovation(int id);
}