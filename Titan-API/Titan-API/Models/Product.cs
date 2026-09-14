namespace Titan_API.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? ImageUrl { get; set; }

    /// <summary>Up to 3 image URLs, in display order. ImageUrl mirrors the first entry for back-compat.</summary>
    public List<string> ImageUrls { get; set; } = new();

    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
}
