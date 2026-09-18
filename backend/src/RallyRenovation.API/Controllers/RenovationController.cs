
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;
using RallyRenovation.API.Services;

namespace RallyRenovation.API.Controllers;

[Authorize]
[ApiController]
[Route("api/renovations")]
public class RenovationController : ControllerBase
{
    private readonly IRenovationService _service;
    public RenovationController(IRenovationService service)
    {
        _service = service;
    }

    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<List<Renovation>>> GetPublicRenovations(int page = 1, int pageSize = 10)
    {
        var result = await _service.GetPublicFilteredRenovations(page, pageSize);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [HttpGet("byUser")]
    public async Task<ActionResult<List<Renovation>>> GetRenovations(int page = 1, int pageSize = 10)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("UserId of logged in user did not exits.");

        var result = await _service.GetFilteredRenovationsByUser(userId, page, pageSize);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<RenovationLongDto>> GetRenovation(int id)
    {
        var result = await _service.GetRenovation(id);

        if (!result.IsSuccess || result.Value == null)
            return BadRequest(result.Error);

        // Validate: check private/public and ownership
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (result.Value.IsPrivate)
        {
            if (userId == null || userId != result.Value.UserId)
                return Unauthorized("Error: GetRenovation action method: Renovation is private and the current user does not own it");
        }
        if (userId != null && userId == result.Value.UserId)
        {
            result.Value.AccessedByOwner = true;
        }


        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> AddRenovation(AddRenovationDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("UserId of logged in user did not exits.");
        dto.UserId = userId;

        var result = await _service.AddRenovation(dto);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRenovation(int id, AddRenovationDto dto)
    {
        // TODO: check if userId matches current user
        var result = await _service.UpdateRenovation(id, dto);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRenovation(int id)
    {
        // TODO: check if userId of Renovation matches current user
        var result = await _service.DeleteRenovation(id);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpPost("comment")]
    public async Task<IActionResult> AddComment(int renovationId, [FromBody] string commentText)
    {
        Console.WriteLine("id: " + renovationId);
        Console.WriteLine("body: " + commentText);
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");

        var result = await _service.AddComment(renovationId, commentText, userId);
        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpPost("like")]
    public async Task<IActionResult> AddLike(int renovationId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error; user id issue");

        var result = await _service.LikeRenovation(renovationId, userId);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpPost("unlike")]
    public async Task<IActionResult> RemoveLike(int likeId)
    {
        //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error; user id issue");
        // Need to add check if user owns the like

        var result = await _service.UnLikeRenovation(likeId);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpGet("like")]
    public async Task<IActionResult> GetLikedRenovations()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");

        var result = await _service.GetLikedRenovationsOfUser(userId);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }

    [HttpGet("follow")]
    public async Task<ActionResult<List<FollowDto>>> GetFollowings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");
        var result = await _service.GetFollowings(userId);

        if (!result.IsSuccess)
            return BadRequest();
        return Ok(result);

    }

    [HttpPost("follow")]
    public async Task<IActionResult> AddFollow(string followingUserId)
    {
        var userid = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");
        var result = await _service.FollowUser(userid, followingUserId);

        if (!result.IsSuccess)
            return BadRequest();
        return Ok();
    }

    [HttpPost("unfollow")]
    public async Task<IActionResult> RemoveFollow(int followId)
    {
        var userid = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");
        var result = await _service.UnFollowUser(followId);

        if (!result.IsSuccess)
            return BadRequest();
        return Ok();
    }

    [HttpGet("messageThread")]
    public async Task<ActionResult<List<MessageThreadDto>>> MessageThreads()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");
        var result = await _service.GetMessageThreads(userId);
        if (!result.IsSuccess)
            return BadRequest();

        return Ok(result.Value);
    }

    [HttpPost("messageThread")]
    public async Task<IActionResult> AddMessageThreads(string title, string fromUserId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");
        var result = await _service.StartMessageThread(title, userId, fromUserId);

        if (!result.IsSuccess)
            return BadRequest();

        return Ok();
    }

    [HttpGet("messages")]
    public async Task<ActionResult<List<MessageDto>>> Messages(int messageThreadId)
    {
        //Need check if own can access messageThread

        var result = await _service.GetMessagesOfThread(messageThreadId);
        if (!result.IsSuccess)
            return BadRequest();

        return Ok(result.Value);
    }
    [HttpPost("messages")]
    public async Task<IActionResult> AddMessage(int messageThreadId, [FromBody] string body)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Error: user id issue");

        var result = await _service.AddMessageToMessageThread(messageThreadId, userId, body);
        if (!result.IsSuccess)
            return BadRequest();

        return Ok();
    }



}