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
}
