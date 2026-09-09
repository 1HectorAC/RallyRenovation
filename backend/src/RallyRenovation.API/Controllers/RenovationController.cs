
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
public class RenovationController: ControllerBase
{
    private readonly IRenovationService _service;
    public RenovationController(IRenovationService service)
    {
        _service = service;
    }

    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<List<Renovation>>> GetPublicRenovations(int page = 1, int pageSize = 3)
    {
        var renovations = await _service.GetPublicFilteredRenovations(page, pageSize);
       
        return Ok(renovations);
    }

    [HttpGet]
    public async Task<ActionResult<List<Renovation>>> GetRenovations(int page=1, int pageSize=3)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("UserId of logged in user did not exits.");
       
        var renovations = await _service.GetFilteredRenovationsByUser(userId, page, pageSize);
        
        return Ok(renovations);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<Renovation>> GetRenovation(int id){

        var renovation = await _service.GetRenovation(id);
        // TODO: check if renovation is private
        // TODO: If private, check if user is logged in and match userId

        return Ok(renovation);
    }

    [HttpPost]
    public async Task<IActionResult> AddRenovation(AddRenovationDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("UserId of logged in user did not exits.");
        dto.UserId = userId;

        await _service.AddRenovation(dto);

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateRenovation(int id, AddRenovationDto dto)
    {
        // TODO: check if userId matches current user
        await _service.UpdateRenovation(id, dto);
        return Ok();
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteRenovation(int id)
    {
        // TODO: check if userId of Renovation matches current user
        await _service.DeleteRenovation(id);
        return Ok();
    }


}