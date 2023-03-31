using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DescarTec.Api.Config.Identity;

public class TokenJwtBuilder
{
    private SecurityKey? securityKey = null;
    private string subject = "";
    private string issuer = "";
    private string audience = "";
    private readonly Dictionary<string, string> claims = new();
    private int expiryInMinutes = 5;

    public TokenJwtBuilder AddSecurityKey(SecurityKey securityKey)
    {
        this.securityKey = securityKey;
        return this;
    }

    public TokenJwtBuilder AddSubject(string subject)
    {
        this.subject = subject;
        return this;
    }

    public TokenJwtBuilder AddIssuer(string issuer)
    {
        this.issuer = issuer;
        return this;
    }

    public TokenJwtBuilder AddAudience(string audience)
    {
        this.audience = audience;
        return this;
    }

    public TokenJwtBuilder AddClaim(string type, string value)
    {
        claims.Add(type, value);
        return this;
    }

    public TokenJwtBuilder AddClaims(Dictionary<string, string> claims)
    {
        _ = this.claims.Union(claims);
        return this;
    }

    public TokenJwtBuilder AddExpiry(int expiryInMinutes)
    {
        this.expiryInMinutes = expiryInMinutes;
        return this;
    }

    private void EnsureArguments()
    {
        if (securityKey == null)
            throw new ArgumentException("Security Key");

        if (string.IsNullOrEmpty(subject))
            throw new ArgumentException("Subject");

        if (string.IsNullOrEmpty(issuer))
            throw new ArgumentException("Issuer");

        if (string.IsNullOrEmpty(audience))
            throw new ArgumentException("Audience");
    }

    public TokenJwt Builder()
    {
        EnsureArguments();

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, subject),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        }.Union(this.claims.Select(item => new Claim(item.Key, item.Value)));

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
            signingCredentials: new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256)
        );

        return new TokenJwt(token);
    }
}