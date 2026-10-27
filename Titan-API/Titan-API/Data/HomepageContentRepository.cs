using Npgsql;
using Titan_API.Models;

namespace Titan_API.Data;

public class HomepageContentRepository
{
    private readonly string _connectionString;

    public HomepageContentRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("TitanDb")!;
    }

    public async Task<List<HomepageContentEntry>> GetAllAsync()
    {
        var entries = new List<HomepageContentEntry>();
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "SELECT key, value, value_ka FROM homepage_content ORDER BY key", conn);
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            entries.Add(new HomepageContentEntry
            {
                Key = reader.GetString(0),
                Value = reader.IsDBNull(1) ? null : reader.GetString(1),
                ValueKa = reader.IsDBNull(2) ? null : reader.GetString(2)
            });
        }
        return entries;
    }

    /// <summary>
    /// Replaces the whole homepage configuration in one transaction. Entries with
    /// neither value set are dropped, so the field reverts to its default.
    /// </summary>
    public async Task ReplaceAllAsync(IEnumerable<HomepageContentEntry> entries)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        await using var tx = await conn.BeginTransactionAsync();

        await using (var deleteCmd = new NpgsqlCommand("DELETE FROM homepage_content", conn, tx))
        {
            await deleteCmd.ExecuteNonQueryAsync();
        }

        foreach (var entry in entries)
        {
            if (string.IsNullOrWhiteSpace(entry.Value) && string.IsNullOrWhiteSpace(entry.ValueKa))
                continue;

            await using var cmd = new NpgsqlCommand(
                "INSERT INTO homepage_content (key, value, value_ka, updated_at) VALUES (@key, @value, @valueKa, NOW())",
                conn, tx);
            cmd.Parameters.AddWithValue("key", entry.Key);
            cmd.Parameters.AddWithValue("value", (object?)NullIfBlank(entry.Value) ?? DBNull.Value);
            cmd.Parameters.AddWithValue("valueKa", (object?)NullIfBlank(entry.ValueKa) ?? DBNull.Value);
            await cmd.ExecuteNonQueryAsync();
        }

        await tx.CommitAsync();
    }

    private static string? NullIfBlank(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
