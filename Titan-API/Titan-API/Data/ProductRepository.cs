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
            SELECT p.id, p.name, p.description, p.price, p.category_id,
                   c.name AS category_name, p.image_url, p.stock_quantity, p.created_at
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
            SELECT p.id, p.name, p.description, p.price, p.category_id,
                   c.name AS category_name, p.image_url, p.stock_quantity, p.created_at
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
            SELECT p.id, p.name, p.description, p.price, p.category_id,
                   c.name AS category_name, p.image_url, p.stock_quantity, p.created_at
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

        var sql = """
            INSERT INTO products (name, description, price, category_id, image_url, stock_quantity)
            VALUES (@name, @desc, @price, @categoryId, @imageUrl, @stock)
            RETURNING id, created_at
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("name", product.Name);
        cmd.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("price", product.Price);
        cmd.Parameters.AddWithValue("categoryId", product.CategoryId);
        cmd.Parameters.AddWithValue("imageUrl", (object?)product.ImageUrl ?? DBNull.Value);
        cmd.Parameters.AddWithValue("stock", product.StockQuantity);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            product.Id = reader.GetInt32(0);
            product.CreatedAt = reader.GetDateTime(1);
        }
        return product;
    }

    public async Task<bool> UpdateAsync(int id, Product product)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            UPDATE products
            SET name = @name, description = @desc, price = @price,
                category_id = @categoryId, image_url = @imageUrl, stock_quantity = @stock
            WHERE id = @id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);
        cmd.Parameters.AddWithValue("name", product.Name);
        cmd.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("price", product.Price);
        cmd.Parameters.AddWithValue("categoryId", product.CategoryId);
        cmd.Parameters.AddWithValue("imageUrl", (object?)product.ImageUrl ?? DBNull.Value);
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
        return new Product
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
            Price = reader.GetDecimal(3),
            CategoryId = reader.GetInt32(4),
            CategoryName = reader.IsDBNull(5) ? null : reader.GetString(5),
            ImageUrl = reader.IsDBNull(6) ? null : reader.GetString(6),
            StockQuantity = reader.GetInt32(7),
            CreatedAt = reader.GetDateTime(8)
        };
    }
}
