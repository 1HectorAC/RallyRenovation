
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    [HttpPost]
    public async Task<IActionResult> AddRenovation()
    {
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateRenovation()
    {
        return Ok();
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteRenovation()
    {
        return Ok();
    }


}