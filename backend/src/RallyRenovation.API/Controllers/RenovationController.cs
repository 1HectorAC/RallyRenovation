
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RallyRenovation.API.Controllers;

[ApiController]
[Route("api/renovations")]
public class RenovationController: ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult GetRenovations()
    {
        return Ok("Success on get Renovation");
    }
}