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
        await BackfillCategoryTranslationsAsync();
        await BackfillProductTranslationsAsync();
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
                description TEXT,
                name_ka VARCHAR(100)
            );

            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                price NUMERIC(10,2) NOT NULL DEFAULT 0,
                category_id INT REFERENCES categories(id),
                image_url TEXT,
                stock_quantity INT NOT NULL DEFAULT 0,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                description_ka TEXT
            );

            -- Added when product galleries (up to 3 images) were introduced.
            -- CREATE TABLE IF NOT EXISTS above won't add columns to an already-existing
            -- table, so this ALTER runs every startup and backfills existing rows.
            ALTER TABLE products ADD COLUMN IF NOT EXISTS image_urls TEXT[];
            UPDATE products
            SET image_urls = ARRAY[image_url]
            WHERE image_urls IS NULL AND image_url IS NOT NULL;

            -- Idempotent upgrade path for databases created before these columns existed
            ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_ka VARCHAR(100);
            ALTER TABLE products ADD COLUMN IF NOT EXISTS description_ka TEXT;
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
            INSERT INTO categories (name, description, name_ka) VALUES
                ('Guitars', 'Electric and acoustic guitars', 'გიტარები'),
                ('Drums', 'Drum kits and percussion instruments', 'დასარტყამი ინსტრუმენტები'),
                ('Keyboards', 'Pianos, synthesizers, and MIDI controllers', 'კლავიშებიანი ინსტრუმენტები');

            INSERT INTO products (name, description, price, category_id, image_url, image_urls, stock_quantity, description_ka) VALUES
                ('Fender Stratocaster', 'Classic electric guitar with versatile tone', 1299.99, 1, 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop&q=80', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop&q=80'], 15, 'კლასიკური ელექტრო გიტარა მრავალმხრივი ჟღერადობით'),
                ('Yamaha Stage Custom', 'Professional 5-piece drum kit', 849.00, 2, 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop&q=80', ARRAY['https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop&q=80'], 8, 'პროფესიონალური 5-ნაწილიანი დრამის კომპლექტი'),
                ('Roland FP-30X', 'Portable digital piano with weighted keys', 699.99, 3, 'https://images.unsplash.com/photo-1520523839897-bd0b52aaf081?w=500&h=500&fit=crop&q=80', ARRAY['https://images.unsplash.com/photo-1520523839897-bd0b52aaf081?w=500&h=500&fit=crop&q=80'], 12, 'პიანინო');
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        await cmd.ExecuteNonQueryAsync();
        _logger.LogInformation("Seeded database with sample categories and products");
    }

    /// <summary>
    /// Fills in Georgian names for the well-known seed categories on databases that
    /// already existed before name_ka was introduced (SeedDataAsync only runs on an
    /// empty table, so it would otherwise never reach already-seeded rows).
    /// Safe to run on every startup: only touches rows still missing a translation.
    /// </summary>
    private async Task BackfillCategoryTranslationsAsync()
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            UPDATE categories SET name_ka = 'გიტარები' WHERE name = 'Guitars' AND name_ka IS NULL;
            UPDATE categories SET name_ka = 'დასარტყამი ინსტრუმენტები' WHERE name = 'Drums' AND name_ka IS NULL;
            UPDATE categories SET name_ka = 'კლავიშებიანი ინსტრუმენტები' WHERE name = 'Keyboards' AND name_ka IS NULL;
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        var rows = await cmd.ExecuteNonQueryAsync();
        if (rows > 0)
        {
            _logger.LogInformation("Backfilled Georgian names for {Rows} existing categories", rows);
        }
    }

    /// <summary>
    /// Fills in Georgian descriptions for a known set of already-seeded products.
    /// Matches by product name rather than description text, since description text
    /// isn't guaranteed unique/stable (e.g. punctuation can drift). Safe to re-run:
    /// only touches rows still missing a translation.
    /// </summary>
    private async Task BackfillProductTranslationsAsync()
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var sql = """
            UPDATE products SET description_ka = 'კლასიკური ელექტრო გიტარა მრავალმხრივი ჟღერადობით' WHERE name = 'Fender Stratocaster' AND description_ka IS NULL;
            UPDATE products SET description_ka = 'პროფესიონალური 5-ნაწილიანი დრამის კომპლექტი' WHERE name = 'Yamaha Stage Custom' AND description_ka IS NULL;
            UPDATE products SET description_ka = 'პიანინო' WHERE name = 'Roland FP-30X' AND description_ka IS NULL;
            UPDATE products SET description_ka = 'კლასიკური ელექტრო გიტარა' WHERE name = 'Gibson Les Paul' AND description_ka IS NULL;
            UPDATE products SET description_ka = 'პრემიუმ კლასის ელექტრო გიტარა' WHERE name = 'Gibson Les Paul Standard' AND description_ka IS NULL;
            """;

        await using var cmd = new NpgsqlCommand(sql, conn);
        var rows = await cmd.ExecuteNonQueryAsync();
        if (rows > 0)
        {
            _logger.LogInformation("Backfilled Georgian descriptions for {Rows} existing products", rows);
        }
    }
}
