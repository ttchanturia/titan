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

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        var discountError = NormalizeDiscount(product);
        if (discountError is not null) return BadRequest(discountError);

        var created = await _repo.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        var discountError = NormalizeDiscount(product);
        if (discountError is not null) return BadRequest(discountError);

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

    // An empty or zero discount price means "no discount"; otherwise it must undercut the price.
    private static string? NormalizeDiscount(Product product)
    {
        if (product.DiscountPrice is null or <= 0)
        {
            product.DiscountPrice = null;
            return null;
        }
        return product.DiscountPrice >= product.Price
            ? "Discount price must be lower than the regular price."
            : null;
    }
}
