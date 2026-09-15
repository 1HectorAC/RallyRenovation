
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;
using RallyRenovation.API.Utilities;

namespace RallyRenovation.API.Services;

public interface IRenovationService
{
    Task<Result<List<RenovationShortDto>>> GetPublicFilteredRenovations(int page, int pageSize);

    Task<Result<List<RenovationShortDto>>> GetFilteredRenovationsByUser(string userId, int page, int pageSize);

    Task<Result<RenovationLongDto>> GetRenovation(int id);

    Task<Result> AddRenovation(AddRenovationDto dto);

    Task<Result> UpdateRenovation(int id, AddRenovationDto dto);

    Task<Result> DeleteRenovation(int id);

    Task<Result> AddComment(int renovationId, string commentText, string userId);

    Task<Result> LikeRenovation(int renovationId, string userId);

    Task<Result<List<RenovationShortDto>>> GetLikedRenovationsOfUser(string userId);

    Task<Result> FollowUser(string userId, string followingUserId);
}