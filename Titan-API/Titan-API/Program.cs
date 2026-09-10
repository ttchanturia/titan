using Microsoft.Extensions.FileProviders;
using Titan_API.Auth;
using Titan_API.Data;
using Titan_API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Image upload storage (see Controllers/UploadsController.cs)
var uploadSettings = builder.Configuration.GetSection("Uploads").Get<UploadSettings>()
    ?? new UploadSettings();
var uploadsPath = Path.IsPathRooted(uploadSettings.Directory)
    ? uploadSettings.Directory
    : Path.Combine(builder.Environment.ContentRootPath, uploadSettings.Directory);
Directory.CreateDirectory(uploadsPath);
uploadSettings.Directory = uploadsPath;
builder.Services.AddSingleton(uploadSettings);

// Basic Authentication with hardcoded users (see Auth/BasicAuthenticationHandler.cs)
builder.Services
    .AddAuthentication(BasicAuthenticationHandler.SchemeName)
    .AddScheme<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions, BasicAuthenticationHandler>(
        BasicAuthenticationHandler.SchemeName, null);
builder.Services.AddAuthorization();

// Add CORS policy for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register database services
builder.Services.AddSingleton<DatabaseInitializer>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<CategoryRepository>();

var app = builder.Build();

// Initialize database (ensure DB, tables, and seed data exist)
using (var scope = app.Services.CreateScope())
{
    var dbInit = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
    await dbInit.InitializeAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Enable middleware to serve generated Swagger as a JSON endpoint.
    app.UseSwagger();
    // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
    // specifying the Swagger JSON endpoint.
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// Serve uploaded images at /uploads (in production Nginx serves this path
// straight from disk; this keeps local dev working without Nginx).
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads",
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
