using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Titan_API.Data;
using Titan_API.Models;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductRepository _repo;

    public ProductsController(ProductRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        return await _repo.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _repo.GetByIdAsync(id);
        return product is null ? NotFound() : product;
    }

    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<List<Product>>> GetByCategory(int categoryId)
    {
        return await _repo.GetByCategoryAsync(categoryId);
    }

    private const int MaxImages = 3;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        if (product.ImageUrls?.Count > MaxImages)
        {
            return BadRequest(new { error = $"A product can have at most {MaxImages} images." });
        }

        var created = await _repo.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        if (product.ImageUrls?.Count > MaxImages)
        {
            return BadRequest(new { error = $"A product can have at most {MaxImages} images." });
        }

        var updated = await _repo.UpdateAsync(id, product);
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
