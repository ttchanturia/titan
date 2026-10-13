using Npgsql;
using Titan_API.Models;

namespace Titan_API.Data;

public class BrandRepository
{
    private readonly string _connectionString;

    public BrandRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("TitanDb")!;
    }

    public async Task<List<Brand>> GetAllAsync()
    {
        var brands = new List<Brand>();
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand("SELECT id, name, name_ka FROM brands ORDER BY name", conn);
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            brands.Add(MapBrand(reader));
        }
        return brands;
    }

    public async Task<Brand?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand("SELECT id, name, name_ka FROM brands WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        return await reader.ReadAsync() ? MapBrand(reader) : null;
    }

    public async Task<Brand> CreateAsync(Brand brand)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "INSERT INTO brands (name, name_ka) VALUES (@name, @nameKa) RETURNING id", conn);
        cmd.Parameters.AddWithValue("name", brand.Name);
        cmd.Parameters.AddWithValue("nameKa", (object?)brand.NameKa ?? DBNull.Value);

        brand.Id = (int)(await cmd.ExecuteScalarAsync())!;
        return brand;
    }

    public async Task<bool> UpdateAsync(int id, Brand brand)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "UPDATE brands SET name = @name, name_ka = @nameKa WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);
        cmd.Parameters.AddWithValue("name", brand.Name);
        cmd.Parameters.AddWithValue("nameKa", (object?)brand.NameKa ?? DBNull.Value);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand("DELETE FROM brands WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        return await cmd.ExecuteNonQueryAsync() > 0;
    }

    private static Brand MapBrand(NpgsqlDataReader reader)
    {
        return new Brand
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            NameKa = reader.IsDBNull(2) ? null : reader.GetString(2)
        };
    }
}
