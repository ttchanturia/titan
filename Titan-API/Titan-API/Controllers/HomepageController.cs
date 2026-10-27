using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Titan_API.Data;
using Titan_API.Models;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomepageController : ControllerBase
{
    private const int MaxEntries = 200;
    private const int MaxValueLength = 2000;
    private static readonly Regex KeyPattern = new(@"^[a-z0-9_]{1,100}$", RegexOptions.Compiled);

    private readonly HomepageContentRepository _repo;

    public HomepageController(HomepageContentRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<HomepageContentEntry>>> GetAll()
    {
        return await _repo.GetAllAsync();
    }

    /// <summary>
    /// Replaces the full homepage configuration. Fields left out of the list (or
    /// sent with empty values) fall back to the frontend defaults.
    /// </summary>
    [Authorize]
    [HttpPut]
    public async Task<IActionResult> Replace(List<HomepageContentEntry> entries)
    {
        if (entries.Count > MaxEntries)
            return BadRequest($"At most {MaxEntries} entries are allowed.");

        foreach (var entry in entries)
        {
            if (!KeyPattern.IsMatch(entry.Key))
                return BadRequest($"Invalid key: '{entry.Key}'.");
            if (entry.Value?.Length > MaxValueLength || entry.ValueKa?.Length > MaxValueLength)
                return BadRequest($"Value for '{entry.Key}' exceeds {MaxValueLength} characters.");
        }

        if (entries.Select(e => e.Key).Distinct().Count() != entries.Count)
            return BadRequest("Duplicate keys are not allowed.");

        await _repo.ReplaceAllAsync(entries);
        return NoContent();
    }
}
