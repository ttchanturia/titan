using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [Authorize]
    [HttpGet("verify")]
    public IActionResult Verify()
    {
        return Ok(new { username = User.Identity?.Name });
    }
}
