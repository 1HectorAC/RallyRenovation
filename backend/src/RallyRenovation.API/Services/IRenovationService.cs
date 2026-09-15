
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

    // Consider moving below into seperate services

    Task<Result> AddComment(int renovationId, string commentText, string userId);

    Task<Result> LikeRenovation(int renovationId, string userId);

    Task<Result> UnLikeRenovation(int renovationId, string userId);

    Task<Result<List<RenovationShortDto>>> GetLikedRenovationsOfUser(string userId);

    Task<Result> FollowUser(string userId, string followingUserId);

    Task<Result> UnFollowUser(string userId, string followingUserId);

    /*
    Task<Result<List<MessageThread>>> GetMessageThreads(string userId);

    Task<Result<Message>> GetMessagesOfThread(int messageThreadId);

    Task<Result> StartMessageThread(string title, string UserId, string FromUserid, string body);

    Task<Result> AddMessageToMessageThread(int messageThreadId, string SenderUserId, string body);
    */
}