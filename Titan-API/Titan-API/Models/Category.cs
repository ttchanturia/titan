namespace Titan_API.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameKa { get; set; }
    public string? Description { get; set; }

    /// <summary>Georgian display name. Optional — not every category has been translated yet.</summary>
    public string? NameKa { get; set; }

    /// <summary>Null for a top-level category; otherwise the id of the parent category (self-referencing FK).</summary>
    public int? ParentId { get; set; }

    /// <summary>
    /// Subcategories nested under this category. Populated only on the top-level
    /// entries returned by GET /api/categories (see CategoryRepository.GetAllAsync);
    /// always empty on a subcategory itself, since the hierarchy is two levels deep.
    /// </summary>
    public List<Category> Children { get; set; } = new();

    /// <summary>
    /// Resolves the display name for a given locale, falling back to the English
    /// name whenever no translation exists yet (per the fallback rule).
    /// </summary>
    public string GetLocalizedName(string locale) =>
        locale == "ka" && !string.IsNullOrWhiteSpace(NameKa) ? NameKa : Name;
}
