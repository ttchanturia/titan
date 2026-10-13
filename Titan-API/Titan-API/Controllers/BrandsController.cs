using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Titan_API.Data;
using Titan_API.Models;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandsController : ControllerBase
{
    private readonly BrandRepository _repo;

    public BrandsController(BrandRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<Brand>>> GetAll()
    {
        return await _repo.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Brand>> GetById(int id)
    {
        var brand = await _repo.GetByIdAsync(id);
        return brand is null ? NotFound() : brand;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Brand>> Create(Brand brand)
    {
        if (string.IsNullOrWhiteSpace(brand.Name))
            return BadRequest("The English name is required.");

        var created = await _repo.CreateAsync(brand);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Brand brand)
    {
        if (string.IsNullOrWhiteSpace(brand.Name))
            return BadRequest("The English name is required.");

        var updated = await _repo.UpdateAsync(id, brand);
        return updated ? NoContent() : NotFound();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _repo.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
