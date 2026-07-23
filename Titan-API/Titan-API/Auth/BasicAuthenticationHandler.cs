using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace Titan_API.Auth;

public static class HardcodedUsers
{
    // Simple hardcoded user store - swap for a real user database later.
    public static readonly Dictionary<string, string> Credentials = new()
    {
        ["admin"] = "admin123",
        ["staff"] = "staff123",
    };
}

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "BasicAuthentication";

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder)
        : base(options, logger, encoder)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
        {
            return Task.FromResult(AuthenticateResult.Fail("Missing Authorization header"));
        }

        if (!AuthenticationHeaderValue.TryParse(authorizationHeader, out var headerValue) ||
            !"Basic".Equals(headerValue.Scheme, StringComparison.OrdinalIgnoreCase) ||
            headerValue.Parameter is null)
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));
        }

        string username;
        string password;
        try
        {
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(headerValue.Parameter));
            var separatorIndex = decoded.IndexOf(':');
            if (separatorIndex < 0)
            {
                return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));
            }

            username = decoded[..separatorIndex];
            password = decoded[(separatorIndex + 1)..];
        }
        catch (FormatException)
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));
        }

        if (!HardcodedUsers.Credentials.TryGetValue(username, out var expectedPassword) ||
            expectedPassword != password)
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid username or password"));
        }

        var claims = new[] { new Claim(ClaimTypes.Name, username) };
        var identity = new ClaimsIdentity(claims, SchemeName);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, SchemeName);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }

    protected override Task HandleChallengeAsync(AuthenticationProperties properties)
    {
        Response.Headers.WWWAuthenticate = "Basic realm=\"Titan Admin\"";
        return base.HandleChallengeAsync(properties);
    }
}
