using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace Titan_API.Services;

/// <summary>
/// Makes a product photo's white studio backdrop transparent, so it blends with
/// whatever background color surrounds it on the site instead of showing a
/// stark white box. Only the white region reachable from the image's edges is
/// touched (a border-seeded flood fill), so a product with its own white or
/// light-colored parts in the middle of the frame - a white pickguard, tuning
/// pegs, chrome highlights - is left alone, since those pixels are never
/// connected to the border.
/// </summary>
public static class BackgroundTransparency
{
    public static void MakeWhiteBackgroundTransparent(
        Image<Rgba32> image,
        byte fullWhiteMin,
        byte partialWhiteMin)
    {
        int width = image.Width;
        int height = image.Height;
        if (width == 0 || height == 0) return;

        var background = new bool[width * height];
        var queue = new Queue<(int X, int Y)>();

        image.ProcessPixelRows(accessor =>
        {
            // accessor is a ref struct, so it can't be captured by a nested local
            // function (closures over ref-like types aren't allowed) - it's passed
            // through explicitly as a parameter instead.
            bool IsCandidate(PixelAccessor<Rgba32> acc, int x, int y)
            {
                var p = acc.GetRowSpan(y)[x];
                return p.R >= partialWhiteMin && p.G >= partialWhiteMin && p.B >= partialWhiteMin;
            }

            void Seed(PixelAccessor<Rgba32> acc, int x, int y)
            {
                int idx = y * width + x;
                if (background[idx] || !IsCandidate(acc, x, y)) return;
                background[idx] = true;
                queue.Enqueue((x, y));
            }

            // Seed from every border pixel, then flood-fill inward through
            // 4-connected neighbors that also pass the "white enough" test.
            for (int x = 0; x < width; x++)
            {
                Seed(accessor, x, 0);
                Seed(accessor, x, height - 1);
            }
            for (int y = 0; y < height; y++)
            {
                Seed(accessor, 0, y);
                Seed(accessor, width - 1, y);
            }

            while (queue.Count > 0)
            {
                var (x, y) = queue.Dequeue();
                if (x > 0) Seed(accessor, x - 1, y);
                if (x < width - 1) Seed(accessor, x + 1, y);
                if (y > 0) Seed(accessor, x, y - 1);
                if (y < height - 1) Seed(accessor, x, y + 1);
            }

            // Graduated alpha rather than a hard cutout: a pixel right at
            // fullWhiteMin or above goes fully transparent, one at
            // partialWhiteMin stays fully opaque, and in between it's blended -
            // this feathers the edge around the product instead of leaving a
            // visible ring of still-opaque near-white pixels.
            var range = Math.Max(1, fullWhiteMin - partialWhiteMin);
            for (int y = 0; y < height; y++)
            {
                var row = accessor.GetRowSpan(y);
                for (int x = 0; x < width; x++)
                {
                    if (!background[y * width + x]) continue;

                    ref var pixel = ref row[x];
                    int whiteness = Math.Min(pixel.R, Math.Min(pixel.G, pixel.B));
                    double t = Math.Clamp((whiteness - partialWhiteMin) / (double)range, 0, 1);
                    pixel.A = (byte)Math.Round((1 - t) * 255);
                }
            }
        });
    }
}
