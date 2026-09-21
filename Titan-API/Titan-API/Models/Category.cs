namespace Titan_API.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    /// <summary>Georgian display name. Optional — not every category has been translated yet.</summary>
    public string? NameKa { get; set; }

    /// <summary>
    /// Resolves the display name for a given locale, falling back to the
    /// English name whenever no translation exists yet (per the fallback rule).
    /// </summary>
    public string GetLocalizedName(string locale) =>
        locale == "ka" && !string.IsNullOrWhiteSpace(NameKa) ? NameKa : Name;
}
