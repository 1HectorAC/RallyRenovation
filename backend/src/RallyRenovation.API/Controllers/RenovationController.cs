
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

    //TODO: fix endpoint selection ambig. issue with Gets.

    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<List<Renovation>>> GetPublicRenovations(int page = 1, int pageSize = 3)
    {
        var result = await _service.GetPublicFilteredRenovations(page, pageSize);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [HttpGet]
    public async Task<ActionResult<List<Renovation>>> GetRenovations(int page = 1, int pageSize = 3)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("UserId of logged in user did not exits.");

        var result = await _service.GetFilteredRenovationsByUser(userId, page, pageSize);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<Renovation>> GetRenovation(int id)
    {
        var result = await _service.GetRenovation(id);

        if (!result.IsSuccess || result.Value == null)
            return BadRequest(result.Error);

        // Validate: check private/public and ownership
        if (result.Value.IsPrivate)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || userId != result.Value.UserId)
                return Unauthorized("Error: GetRenovation action method: Renovation is private and the current user does not own it");
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

    [HttpPut]
    public async Task<IActionResult> UpdateRenovation(int id, AddRenovationDto dto)
    {
        // TODO: check if userId matches current user
        var result = await _service.UpdateRenovation(id, dto);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteRenovation(int id)
    {
        // TODO: check if userId of Renovation matches current user
        var result = await _service.DeleteRenovation(id);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return Ok();
    }
}