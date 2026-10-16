namespace Titan_API.Models;

public class UploadSettings
{
    /// <summary>
    /// Directory where uploaded images are written. Relative paths resolve
    /// against the app content root; in production this is overridden with an
    /// absolute path (e.g. /opt/titan-uploads) via the Uploads__Directory env var.
    /// </summary>
    public string Directory { get; set; } = "uploads";

    /// <summary>Reject uploads larger than this (bytes).</summary>
    public long MaxSizeBytes { get; set; } = 8 * 1024 * 1024;

    /// <summary>Downscale images whose longest edge exceeds this (px).</summary>
    public int MaxDimension { get; set; } = 1600;

    /// <summary>
    /// A pixel at or above this value (per channel, 0-255) is treated as fully
    /// background once reached by the border flood fill (see
    /// BackgroundTransparency.MakeWhiteBackgroundTransparent) - set fully transparent.
    /// </summary>
    public byte BackgroundFullWhiteMin { get; set; } = 245;

    /// <summary>
    /// A pixel at or above this value (per channel) is eligible for the flood fill at
    /// all, and gets a partial (graduated) alpha between FullWhiteMin and this value -
    /// this is what feathers the edge around the product instead of leaving a hard cutout.
    /// Lower this if real backdrops aren't getting fully caught; raise it if a product's
    /// own light-colored edges are being eaten into.
    /// </summary>
    public byte BackgroundPartialWhiteMin { get; set; } = 215;
}
