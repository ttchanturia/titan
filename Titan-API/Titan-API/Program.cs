using Titan_API.Auth;
using Titan_API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Basic Authentication with hardcoded users
builder.Services
    .AddAuthentication(BasicAuthenticationHandler.SchemeName)
    .AddScheme<
        Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions,
        BasicAuthenticationHandler
    >(
        BasicAuthenticationHandler.SchemeName,
        null
    );

builder.Services.AddAuthorization();

// Add CORS policy for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "BasicAuthentication",
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
            Scheme = "basic",
            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
            Description = "Enter your username and password"
        }
    );

    options.AddSecurityRequirement(
        new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference =
                        new Microsoft.OpenApi.Models.OpenApiReference
                        {
                            Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            Id = "BasicAuthentication"
                        }
                },
                Array.Empty<string>()
            }
        }
    );
});

// Register database services
builder.Services.AddSingleton<DatabaseInitializer>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<CategoryRepository>();

var app = builder.Build();

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var dbInit = scope.ServiceProvider
        .GetRequiredService<DatabaseInitializer>();

    await dbInit.InitializeAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();