namespace Titan_API.Models;

/// <summary>
/// One configurable homepage field (a hero title, a card image, ...), keyed by a
/// stable identifier the frontend defines (e.g. "home_hero_title_line1").
/// Value holds the English text, or the URL for image fields; ValueKa holds the
/// Georgian text and is unused for images. Fields with no row fall back to the
/// frontend's built-in defaults.
/// </summary>
public class HomepageContentEntry
{
    public string Key { get; set; } = string.Empty;
    public string? Value { get; set; }
    public string? ValueKa { get; set; }
}
