using Npgsql;
using Titan_API.Models;

namespace Titan_API.Data;

public class CategoryRepository
{
    private readonly string _connectionString;

    public CategoryRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("TitanDb")!;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        var categories = new List<Category>();
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            SELECT c.id, c.name, c.name_ka, c.description, c.parent_id, p.name AS parent_name
            FROM categories c
            LEFT JOIN categories p ON p.id = c.parent_id
            ORDER BY c.id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            categories.Add(MapCategory(reader));
        }
        return categories;
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            SELECT c.id, c.name, c.name_ka, c.description, c.parent_id, p.name AS parent_name
            FROM categories c
            LEFT JOIN categories p ON p.id = c.parent_id
            WHERE c.id = @id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        return await reader.ReadAsync() ? MapCategory(reader) : null;
    }

    public async Task<Category> CreateAsync(Category category)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            INSERT INTO categories (name, name_ka, description, parent_id)
            VALUES (@name, @nameKa, @desc, @parentId)
            RETURNING id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("name", category.Name);
        cmd.Parameters.AddWithValue("nameKa", (object?)category.NameKa ?? DBNull.Value);
        cmd.Parameters.AddWithValue("desc", (object?)category.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("parentId", (object?)category.ParentId ?? DBNull.Value);

        category.Id = (int)(await cmd.ExecuteScalarAsync())!;
        return category;
    }

    public async Task<bool> UpdateAsync(int id, Category category)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            UPDATE categories
            SET name = @name, name_ka = @nameKa, description = @desc, parent_id = @parentId
            WHERE id = @id
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);
        cmd.Parameters.AddWithValue("name", category.Name);
        cmd.Parameters.AddWithValue("nameKa", (object?)category.NameKa ?? DBNull.Value);
        cmd.Parameters.AddWithValue("desc", (object?)category.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("parentId", (object?)category.ParentId ?? DBNull.Value);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand("DELETE FROM categories WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    private static Category MapCategory(NpgsqlDataReader reader)
    {
        return new Category
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            NameKa = reader.IsDBNull(2) ? null : reader.GetString(2),
            Description = reader.IsDBNull(3) ? null : reader.GetString(3),
            ParentId = reader.IsDBNull(4) ? null : reader.GetInt32(4),
            ParentName = reader.IsDBNull(5) ? null : reader.GetString(5)
        };
    }
}
