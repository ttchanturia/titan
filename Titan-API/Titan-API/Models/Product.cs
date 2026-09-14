namespace Titan_API.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    /// <summary>Georgian description. Optional — not every product has been translated yet.</summary>
    public string? DescriptionKa { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? CategoryNameKa { get; set; }
    public string? ImageUrl { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Resolves the display description for a given locale, falling back to the
    /// English description whenever no translation exists yet (per the fallback rule).
    /// </summary>
    public string? GetLocalizedDescription(string locale) =>
        locale == "ka" && !string.IsNullOrWhiteSpace(DescriptionKa) ? DescriptionKa : Description;
}
