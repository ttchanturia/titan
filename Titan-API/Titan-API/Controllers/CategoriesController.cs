using Microsoft.AspNetCore.Mvc;
using Titan_API.Data;
using Titan_API.Models;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryRepository _repo;

    public CategoriesController(CategoryRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetAll()
    {
        return await _repo.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetById(int id)
    {
        var category = await _repo.GetByIdAsync(id);
        return category is null ? NotFound() : category;
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Create(Category category)
    {
        var created = await _repo.CreateAsync(category);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category category)
    {
        var updated = await _repo.UpdateAsync(id, category);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _repo.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
