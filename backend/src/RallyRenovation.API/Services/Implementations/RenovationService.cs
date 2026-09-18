
using Microsoft.EntityFrameworkCore;
using RallyRenovation.API.Data;
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;
using RallyRenovation.API.Utilities;

namespace RallyRenovation.API.Services.Implementations;

public class RenovationService : IRenovationService
{
    private readonly AppDbContext _context;
    public RenovationService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Result<List<RenovationShortDto>>> GetPublicFilteredRenovations(int page, int pageSize)
    {
        if (page < 1 || pageSize < 1)
            return Result<List<RenovationShortDto>>.Fail("Error: GetFilteredRenovationByUser: filters passed in were off");

        var renovations = _context.Renovations
            .Include(i => i.User)
            .AsNoTracking()
            .OrderByDescending(i => i.TimeStamp);

        var result = await renovations.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        var formatedResult = result.Select(
            i => new RenovationShortDto
            {
                Id = i.Id,
                Title = i.Title,
                Description = i.Description,
                OwnerName = i.User!.UserName!,
                CatagoryList = i.CatagoryList
            }).ToList();

        return Result<List<RenovationShortDto>>.Ok(formatedResult);
    }

    public async Task<Result<List<RenovationShortDto>>> GetFilteredRenovationsByUser(string userId, int page, int pageSize)
    {
        //TODO: validation if accessing renovation by user
        if (page < 1 || pageSize < 1)
            return Result<List<RenovationShortDto>>.Fail("Error: GetFilteredRenovationByUser: filters passed in were off");

        var renovations = _context.Renovations
            .Include(i => i.User)
            .AsNoTracking()
            .OrderByDescending(i => i.TimeStamp)
            .Where(i => i.UserId == userId);

        var result = await renovations.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        var formatedResult = result.Select(
                    i => new RenovationShortDto
                    {
                        Id = i.Id,
                        Title = i.Title,
                        Description = i.Description,
                        OwnerName = i.User!.UserName!,
                        CatagoryList = i.CatagoryList
                    }).ToList();

        return Result<List<RenovationShortDto>>.Ok(formatedResult);
    }

    public async Task<Result<RenovationLongDto>> GetRenovation(int id)
    {
        // Consider splitting up Getting Renovation, comments, and total likes
        var renovation = await _context.Renovations
            .Include(i => i.Comments)
            .ThenInclude(i => i.User)
            .Include(i => i.User)
            .Include(i => i.Likes)
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == id);

        if (renovation == null)
            return Result<RenovationLongDto>.Fail($"Error: GetRenovation: renovation with id {id} not found");

        var formatedResult = new RenovationLongDto
        {
            Id = renovation.Id,
            UserId = renovation.UserId,
            OwnerName = renovation.User!.UserName!,
            Title = renovation.Title,
            Description = renovation.Description,
            IsPrivate = renovation.IsPrivate,
            CatagoryList = renovation.CatagoryList,
            Cost = renovation.Cost,
            TotalDays = renovation.TotalDays,
            Company = renovation.Company,
            Location = renovation.Location,
            BeforeImageList = renovation.BeforeImageList,
            AfterImageList = renovation.AfterImageList,
            Date = renovation.TimeStamp.Date.ToString(),
            Comments = renovation.Comments.OrderByDescending(i => i.TimeStamp).Select(i => new RenovationCommentDto { CommentText = i.CommentText, SenderName = i.User!.UserName!, Date = i.TimeStamp.Date.ToString() }).ToList(),
            TotalLikes = renovation.Likes.Count,
            AccessedByOwner = false
        };


        return Result<RenovationLongDto>.Ok(formatedResult);
    }

    public async Task<Result> AddRenovation(AddRenovationDto dto)
    {
        if (dto == null || dto.UserId == null)
            return Result.Fail("Error: AddRenovation, dto or userId was missing.");

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

        return Result.Ok();
    }

    public async Task<Result> UpdateRenovation(int id, AddRenovationDto dto)
    {
        var renovation = await _context.Renovations
           .FirstOrDefaultAsync(i => i.Id == id);

        if (renovation == null)
            return Result.Fail($"Error: UpdateRenovation: renovation with id {id} not found");

        renovation.Title = dto.Title;
        renovation.Description = dto.Description;
        renovation.IsPrivate = dto.IsPrivate;
        renovation.CatagoryList = dto.CatagoryList;
        renovation.Cost = dto.Cost;
        renovation.TotalDays = dto.TotalDays;
        renovation.Company = dto.Company;
        renovation.BeforeImageList = dto.BeforeImageList;
        renovation.AfterImageList = dto.AfterImageList;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> DeleteRenovation(int id)
    {
        var renovation = await _context.Renovations
            .FirstOrDefaultAsync(i => i.Id == id);

        if (renovation == null)
            return Result.Fail($"Error: UpdateRenovation: renovation with id {id} not found");

        _context.Remove(renovation);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> AddComment(int renovationId, string commentText, string userId)
    {
        var renovation = await _context.Renovations.FirstOrDefaultAsync(i => i.Id == renovationId);

        if (renovation is null)
            return Result.Fail("Error: AddComment, Renovation with id does not exits. id:" + renovationId);

        // Maybe also check if user exits
        // validate text too

        var comment = new Comment
        {
            CommentText = commentText,
            RenovationId = renovationId,
            UserId = userId,
            TimeStamp = DateTime.UtcNow
        };

        await _context.Comments.AddAsync(comment);

        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> LikeRenovation(int renovationId, string userId)
    {
        // Validation: check if like exits:
        var likeCheck = await _context.Likes
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.RenovationId == renovationId && i.UserId == userId);
        if (likeCheck != null)
            return Result.Fail("Error: LikeRenovation, Like already exits");

        var renovation = await _context.Renovations.FirstOrDefaultAsync(i => i.Id == renovationId);

        if (renovation is null)
            return Result.Fail("Error: LikeRenovation, Renovation with id does not exits. id:" + renovationId);


        // Maybe also check if user exits
        // validate text too

        var like = new Like
        {
            RenovationId = renovationId,
            UserId = userId,
            TimeStamp = DateTime.UtcNow
        };

        await _context.Likes.AddAsync(like);

        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> UnLikeRenovation(int likeId)
    {
        var like = await _context.Likes
        .FirstOrDefaultAsync(i => i.Id == likeId);
        if (like == null)
            return Result.Fail("Error: UnLikeRenovation, Like does not exits");

        _context.Likes.Remove(like);
        await _context.SaveChangesAsync();
        return Result.Ok();

    }

    public async Task<Result<List<RenovationShortDto>>> GetLikedRenovationsOfUser(string userId)
    {

        var renovations = await _context.Renovations
            .Include(i => i.User)
            .AsNoTracking()
            .OrderByDescending(i => i.TimeStamp)
            .Where(i => i.Likes.Any(l => l.UserId == userId))
            .ToListAsync();


        List<RenovationShortDto> formatedResult = renovations.Select(
                    i => new RenovationShortDto
                    {
                        Id = i.Id,
                        Title = i.Title,
                        Description = i.Description,
                        OwnerName = i.User!.UserName!,
                        CatagoryList = i.CatagoryList
                    }).ToList();

        return Result<List<RenovationShortDto>>.Ok(formatedResult);
    }

    public async Task<Result<List<FollowDto>>> GetFollowings(string userId)
    {
        var followings = await _context.Follows
            .AsNoTracking()
            .Include(i => i.FollowingUser)
            .Where(i => i.FollowerUserId == userId).ToListAsync();

        var formatedResult = followings.Select(i => new FollowDto
        {
            Id = i.Id,
            FollowingUserName = i.FollowerUser!.UserName!
        }).ToList();

        return Result<List<FollowDto>>.Ok(formatedResult);

    }

    public async Task<Result> FollowUser(string userId, string followingUserId)
    {
        // Validate check if already exits
        var followingCheck = _context.Follows
            .AsNoTracking()
            .FirstOrDefault(i => i.FollowerUserId == userId && i.FollowingUserId == followingUserId);
        if (followingCheck != null)
            return Result.Fail("Error: FollowUser, already following");

        var follow = new Follow
        {
            FollowerUserId = userId,
            FollowingUserId = followingUserId,
            TimeStamp = DateTime.UtcNow
        };
        await _context.Follows.AddAsync(follow);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> UnFollowUser(int followId)
    {
        var following = _context.Follows
            .FirstOrDefault(i => i.Id == followId);
        if (following == null)
            return Result.Fail("Error: Following does not exits");

        _context.Follows.Remove(following);
        await _context.SaveChangesAsync();
        return Result.Ok();

    }

    public async Task<Result<List<MessageThreadDto>>> GetMessageThreads(string userId)
    {
        var messageThreads = await _context.MessageThreads
        .Include(i => i.ToUser)
        .Include(i => i.FromUser)
        .AsNoTracking()
        .Where(i => i.ToUserId == userId)
        .ToListAsync();

        var formatedResult = messageThreads.Select(i => new MessageThreadDto
        {
            ThreadId = i.Id,
            FromUserName = i.FromUser!.UserName!,
            Title = i.Title,
            Date = i.TimeStamp.Date.ToString()
        }).ToList();


        return Result<List<MessageThreadDto>>.Ok(formatedResult);
    }

    public async Task<Result<List<MessageDto>>> GetMessagesOfThread(int messageThreadId)
    {
        var messages = await _context.Messages
            .Include(i => i.SenderUser)
            .AsNoTracking()
            .Where(i => i.Id == messageThreadId)
            .OrderByDescending(i => i.TimeStamp)
            .ToListAsync();

        var formatedResult = messages.Select(i => new MessageDto
        {
            SenderName = i.SenderUser!.UserName!,
            Body = i.Body,
            Date = i.TimeStamp.Date.ToString()
        }).ToList();

        return Result<List<MessageDto>>.Ok(formatedResult);
    }


    public async Task<Result> StartMessageThread(string title, string userId, string fromUserid)
    {
        var messageThread = new MessageThread
        {
            Title = title,
            ToUserId = userId,
            FromUserId = fromUserid,
            TimeStamp = DateTime.UtcNow
        };
        await _context.MessageThreads.AddAsync(messageThread);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> AddMessageToMessageThread(int messageThreadId, string senderUserId, string body)
    {
        // Validate: check if messageThread exits
        var check = await _context.MessageThreads.AnyAsync(i => i.Id == messageThreadId);
        if(!check)
            return Result.Fail("Error: AddMessageToMessageThread, RenovationId did not exit");

        // TODO: maybe valideate if user exits

        var message = new Message
        {
            Body = body,
            SenderUserId = senderUserId,
            MessageThreadId = messageThreadId,
            TimeStamp = DateTime.UtcNow
        };

        await _context.Messages.AddAsync(message);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }



}