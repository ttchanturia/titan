using Npgsql;

namespace Titan_API.Data;

public class DatabaseInitializer
{
    private readonly string _connectionString;
    private readonly string _masterConnectionString;
    private readonly ILogger<DatabaseInitializer> _logger;

    public DatabaseInitializer(IConfiguration configuration, ILogger<DatabaseInitializer> logger)
    {
        _connectionString = configuration.GetConnectionString("TitanDb")
            ?? throw new InvalidOperationException("Connection string 'TitanDb' not found.");
        _logger = logger;

        // Build a connection string pointing to the default 'postgres' db for admin operations
        var builder = new NpgsqlConnectionStringBuilder(_connectionString);
        builder.Database = "postgres";
        _masterConnectionString = builder.ConnectionString;
    }

    public async Task InitializeAsync()
    {
        await EnsureDatabaseExists();
        await EnsureTablesExist();
        await SeedDataAsync();
    }

    private async Task EnsureDatabaseExists()
    {
        await using var conn = new NpgsqlConnection(_masterConnectionString);
        await conn.OpenAsync();

        await using var checkCmd = new NpgsqlCommand(
            "SELECT 1 FROM pg_database WHERE datname = @db", conn);
        checkCmd.Parameters.AddWithValue("db", new NpgsqlConnectionStringBuilder(_connectionString).Database!);

        var exists = await checkCmd.ExecuteScalarAsync();
        if (exists is null)
        {
            var dbName = new NpgsqlConnectionStringBuilder(_connectionString).Database!;
            // Database names can't be parameterized; validate to prevent injection
            if (!System.Text.RegularExpressions.Regex.IsMatch(dbName, @"^[a-zA-Z_][a-zA-Z0-9_]*$"))
                throw new InvalidOperationException($"Invalid database name: {dbName}");

            await using var createCmd = new NpgsqlCommand($"CREATE DATABASE \"{dbName}\"", conn);
            await createCmd.ExecuteNonQueryAsync();
            _logger.LogInformation("Created database '{Database}'", dbName);
        }
    }

    private async Task EnsureTablesExist()
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT
            );

            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                price NUMERIC(10,2) NOT NULL DEFAULT 0,
                category_id INT REFERENCES categories(id),
                image_url TEXT,
                stock_quantity INT NOT NULL DEFAULT 0,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        await cmd.ExecuteNonQueryAsync();
        _logger.LogInformation("Ensured tables exist");
    }

    private async Task SeedDataAsync()
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        // Only seed if categories table is empty
        await using var checkCmd = new NpgsqlCommand("SELECT COUNT(*) FROM categories", conn);
        var count = (long)(await checkCmd.ExecuteScalarAsync())!;
        if (count > 0)
        {
            _logger.LogInformation("Database already seeded, skipping");
            return;
        }

        var sql = """
            INSERT INTO categories (name, description) VALUES
                ('Guitars', 'Electric and acoustic guitars'),
                ('Drums', 'Drum kits and percussion instruments'),
                ('Keyboards', 'Pianos, synthesizers, and MIDI controllers');

            INSERT INTO products (name, description, price, category_id, image_url, stock_quantity) VALUES
                ('Fender Stratocaster', 'Classic electric guitar with versatile tone', 1299.99, 1, NULL, 15),
                ('Yamaha Stage Custom', 'Professional 5-piece drum kit', 849.00, 2, NULL, 8),
                ('Roland FP-30X', 'Portable digital piano with weighted keys', 699.99, 3, NULL, 12);
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        await cmd.ExecuteNonQueryAsync();
        _logger.LogInformation("Seeded database with sample categories and products");
    }
}
