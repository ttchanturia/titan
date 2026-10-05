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

    /// <summary>
    /// Returns the category tree: every top-level category (parent_id IS NULL)
    /// with its subcategories nested in Children. GET /api/categories exposes
    /// this shape directly, so the frontend never needs to assemble the tree itself.
    /// </summary>
    public async Task<List<Category>> GetAllAsync()
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        // parent_id NULLS FIRST so every parent is read (and added to byId) before
        // any of its children are read, letting a single pass build the tree.
        await using var cmd = new NpgsqlCommand(
            "SELECT id, name, description, name_ka, parent_id FROM categories ORDER BY parent_id NULLS FIRST, id",
            conn);
        await using var reader = await cmd.ExecuteReaderAsync();

        var byId = new Dictionary<int, Category>();
        var roots = new List<Category>();

        while (await reader.ReadAsync())
        {
            var category = new Category
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                NameKa = reader.IsDBNull(3) ? null : reader.GetString(3),
                ParentId = reader.IsDBNull(4) ? null : reader.GetInt32(4)
            };
            byId[category.Id] = category;

            if (category.ParentId is int parentId && byId.TryGetValue(parentId, out var parent))
            {
                parent.Children.Add(category);
            }
            else
            {
                roots.Add(category);
            }
        }

        return roots;
    }

    /// <summary>Fetches a single category (parent or subcategory) by id, without its children.</summary>
    public async Task<Category?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "SELECT id, name, description, name_ka, parent_id FROM categories WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new Category
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                NameKa = reader.IsDBNull(3) ? null : reader.GetString(3),
                ParentId = reader.IsDBNull(4) ? null : reader.GetInt32(4)
            };
        }
        return null;
    }

    public async Task<Category> CreateAsync(Category category)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "INSERT INTO categories (name, description, name_ka, parent_id) VALUES (@name, @desc, @nameKa, @parentId) RETURNING id",
            conn);
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

        await using var cmd = new NpgsqlCommand(
            "UPDATE categories SET name = @name, description = @desc, name_ka = @nameKa, parent_id = @parentId WHERE id = @id",
            conn);
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
