using Npgsql;
using Titan_API.Models;

namespace Titan_API.Data;

public class ProductRepository
{
    private readonly string _connectionString;

    public ProductRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("TitanDb")!;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        var products = new List<Product>();
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            SELECT p.id, p.name, p.description, p.description_ka, p.price, p.category_id,
                   c.name AS category_name, c.name_ka AS category_name_ka, p.image_url, p.stock_quantity, p.created_at, p.image_urls
            FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            ORDER BY p.id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            products.Add(MapProduct(reader));
        }
        return products;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            SELECT p.id, p.name, p.description, p.description_ka, p.price, p.category_id,
                   c.name AS category_name, c.name_ka AS category_name_ka, p.image_url, p.stock_quantity, p.created_at, p.image_urls
            FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            WHERE p.id = @id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        return await reader.ReadAsync() ? MapProduct(reader) : null;
    }

    public async Task<List<Product>> GetByCategoryAsync(int categoryId)
    {
        var products = new List<Product>();
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            SELECT p.id, p.name, p.description, p.description_ka, p.price, p.category_id,
                   c.name AS category_name, c.name_ka AS category_name_ka, p.image_url, p.stock_quantity, p.created_at, p.image_urls
            FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            WHERE p.category_id = @categoryId
            ORDER BY p.id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("categoryId", categoryId);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            products.Add(MapProduct(reader));
        }
        return products;
    }

    public async Task<Product> CreateAsync(Product product)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        // image_url mirrors the first gallery entry regardless of what the caller sent.
        var imageUrls = product.ImageUrls ?? new List<string>();
        var primaryImageUrl = imageUrls.FirstOrDefault();

        var sql = """
            INSERT INTO products (name, description, description_ka, price, category_id, image_url, image_urls, stock_quantity)
            VALUES (@name, @desc, @descKa, @price, @categoryId, @imageUrl, @imageUrls, @stock)
            RETURNING id, created_at
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("name", product.Name);
        cmd.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("descKa", (object?)product.DescriptionKa ?? DBNull.Value);
        cmd.Parameters.AddWithValue("price", product.Price);
        cmd.Parameters.AddWithValue("categoryId", product.CategoryId);
        cmd.Parameters.AddWithValue("imageUrl", (object?)primaryImageUrl ?? DBNull.Value);
        cmd.Parameters.AddWithValue("imageUrls", imageUrls.ToArray());
        cmd.Parameters.AddWithValue("stock", product.StockQuantity);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            product.Id = reader.GetInt32(0);
            product.CreatedAt = reader.GetDateTime(1);
        }
        product.ImageUrl = primaryImageUrl;
        product.ImageUrls = imageUrls;
        return product;
    }

    public async Task<bool> UpdateAsync(int id, Product product)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var imageUrls = product.ImageUrls ?? new List<string>();
        var primaryImageUrl = imageUrls.FirstOrDefault();

        var sql = """
            UPDATE products
            SET name = @name, description = @desc, description_ka = @descKa, price = @price,
                category_id = @categoryId, image_url = @imageUrl, image_urls = @imageUrls,
                stock_quantity = @stock
            WHERE id = @id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);
        cmd.Parameters.AddWithValue("name", product.Name);
        cmd.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("descKa", (object?)product.DescriptionKa ?? DBNull.Value);
        cmd.Parameters.AddWithValue("price", product.Price);
        cmd.Parameters.AddWithValue("categoryId", product.CategoryId);
        cmd.Parameters.AddWithValue("imageUrl", (object?)primaryImageUrl ?? DBNull.Value);
        cmd.Parameters.AddWithValue("imageUrls", imageUrls.ToArray());
        cmd.Parameters.AddWithValue("stock", product.StockQuantity);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand("DELETE FROM products WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    private static Product MapProduct(NpgsqlDataReader reader)
    {
        var imageUrl = reader.IsDBNull(6) ? null : reader.GetString(6);
        // image_urls may briefly lag image_url for rows written just before the
        // startup backfill runs (see DatabaseInitializer) - fall back accordingly.
        var imageUrls = reader.IsDBNull(9)
            ? (imageUrl is null ? new List<string>() : new List<string> { imageUrl })
            : reader.GetFieldValue<string[]>(9).ToList();

        return new Product
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
            DescriptionKa = reader.IsDBNull(3) ? null : reader.GetString(3),
            Price = reader.GetDecimal(4),
            CategoryId = reader.GetInt32(5),
            CategoryName = reader.IsDBNull(6) ? null : reader.GetString(6),
            CategoryNameKa = reader.IsDBNull(7) ? null : reader.GetString(7),
            ImageUrl = imageUrls.Count > 0 ? imageUrls[0] : imageUrl,
            ImageUrls = imageUrls,
            StockQuantity = reader.GetInt32(9),
            CreatedAt = reader.GetDateTime(10)
        };
    }
}
