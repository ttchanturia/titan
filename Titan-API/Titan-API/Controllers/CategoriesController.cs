using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Category>> Create(Category category)
    {
        var parentError = await ValidateParentAsync(category.ParentId, selfId: null);
        if (parentError is not null)
            return BadRequest(parentError);

        var created = await _repo.CreateAsync(category);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category category)
    {
        var parentError = await ValidateParentAsync(category.ParentId, selfId: id);
        if (parentError is not null)
            return BadRequest(parentError);

        var updated = await _repo.UpdateAsync(id, category);
        return updated ? NoContent() : NotFound();
    }

    /// <summary>
    /// The hierarchy is two levels deep: a parent must itself be top-level, a
    /// category can't be its own parent, and a category that already has
    /// subcategories can't be nested under another one.
    /// </summary>
    private async Task<string?> ValidateParentAsync(int? parentId, int? selfId)
    {
        if (parentId is null)
            return null;

        if (parentId == selfId)
            return "A category cannot be its own parent.";

        var parent = await _repo.GetByIdAsync(parentId.Value);
        if (parent is null)
            return "Parent category not found.";

        if (parent.ParentId is not null)
            return "Subcategories can only be added under a top-level category.";

        if (selfId is int id && await _repo.HasChildrenAsync(id))
            return "This category has subcategories, so it cannot be moved under another category.";

        return null;
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _repo.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
