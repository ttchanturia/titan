using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using Titan_API.Models;

namespace Titan_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private static readonly string[] AllowedContentTypes =
    {
        "image/jpeg", "image/pjpeg", "image/png", "image/webp",
        "image/gif", "image/avif", "image/bmp", "image/tiff",
    };

    private readonly UploadSettings _settings;

    public UploadsController(UploadSettings settings)
    {
        _settings = settings;
    }

    /// <summary>
    /// Accepts an image, downscales it if oversized, re-encodes it as WebP, and
    /// stores it. Returns a site-relative URL under /uploads that the frontend
    /// saves as the product's image.
    /// </summary>
    [Authorize]
    [HttpPost]
    [RequestSizeLimit(15_000_000)]
    public async Task<IActionResult> Upload(IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { error = "No file provided." });
        }

        if (file.Length > _settings.MaxSizeBytes)
        {
            var maxMb = _settings.MaxSizeBytes / (1024 * 1024);
            return BadRequest(new { error = $"File exceeds the {maxMb} MB limit." });
        }

        if (!AllowedContentTypes.Contains(file.ContentType))
        {
            return BadRequest(new { error = "Unsupported image type." });
        }

        try
        {
            await using var input = file.OpenReadStream();
            // Image.LoadAsync sniffs the actual bytes, so a mislabeled file is
            // rejected here rather than trusting the Content-Type above.
            using var image = await Image.LoadAsync(input);

            if (image.Width > _settings.MaxDimension || image.Height > _settings.MaxDimension)
            {
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = new Size(_settings.MaxDimension, _settings.MaxDimension),
                }));
            }

            var fileName = $"{Guid.NewGuid():N}.webp";
            var fullPath = Path.Combine(_settings.Directory, fileName);
            await image.SaveAsWebpAsync(fullPath, new WebpEncoder { Quality = 80 });

            return Ok(new { url = $"/uploads/{fileName}" });
        }
        catch (UnknownImageFormatException)
        {
            return BadRequest(new { error = "File is not a readable image." });
        }
        catch (InvalidImageContentException)
        {
            return BadRequest(new { error = "Image is corrupt or unreadable." });
        }
    }
}
