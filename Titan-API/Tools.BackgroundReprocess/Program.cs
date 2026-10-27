using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.PixelFormats;
using Titan_API.Services;

if (args.Length < 1)
{
    Console.Error.WriteLine("Usage: BackgroundReprocess <uploads-directory> [fullWhiteMin] [partialWhiteMin]");
    return 1;
}

var directory = args[0];
byte fullWhiteMin = args.Length > 1 ? byte.Parse(args[1]) : (byte)245;
byte partialWhiteMin = args.Length > 2 ? byte.Parse(args[2]) : (byte)215;

if (!Directory.Exists(directory))
{
    Console.Error.WriteLine($"Directory not found: {directory}");
    return 1;
}

var files = Directory.GetFiles(directory, "*.webp").OrderBy(f => f).ToArray();
Console.WriteLine($"Found {files.Length} .webp files in {directory}");
Console.WriteLine($"Thresholds: fullWhiteMin={fullWhiteMin}, partialWhiteMin={partialWhiteMin}");
Console.WriteLine();

int ok = 0, failed = 0;
var sw = System.Diagnostics.Stopwatch.StartNew();

foreach (var path in files)
{
    var name = Path.GetFileName(path);
    try
    {
        using (var image = await Image.LoadAsync<Rgba32>(path))
        {
            BackgroundTransparency.MakeWhiteBackgroundTransparent(image, fullWhiteMin, partialWhiteMin);

            // Write to a temp file in the same directory, then atomically rename
            // over the original - never leaves a half-written file in place if
            // something goes wrong mid-save.
            var tmpPath = path + ".tmp";
            await image.SaveAsync(tmpPath, new WebpEncoder { Quality = 80 });
            File.Move(tmpPath, path, overwrite: true);
        }
        ok++;
        Console.WriteLine($"OK    {name}");
    }
    catch (Exception ex)
    {
        failed++;
        Console.WriteLine($"FAIL  {name}  ({ex.GetType().Name}: {ex.Message})");
    }
}

Console.WriteLine();
Console.WriteLine($"Done in {sw.Elapsed.TotalSeconds:F1}s - {ok} succeeded, {failed} failed out of {files.Length}");
return failed == 0 ? 0 : 2;
