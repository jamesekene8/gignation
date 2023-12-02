using Application.Core;
using Domain;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
	public class TokenService
	{
		private readonly IConfiguration _config;
		private readonly UserManager<AppUser> _userManager;

		public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
			_config = config;
			_userManager = userManager;
		}

		public string CreateToken(AppUser user)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, user.UserName),
				new Claim(ClaimTypes.NameIdentifier, user.Id),
				new Claim(ClaimTypes.Email, user.Email),
			};

			if (_userManager.IsInRoleAsync(user, SD.Role_Admin).GetAwaiter().GetResult())
			{
				claims.Add(new Claim(JwtClaimTypes.Role, SD.Role_Admin));
			} else
			{
				claims.Add(new Claim(JwtClaimTypes.Role, SD.Role_Freelancer));
			}

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddMinutes(60),
				SigningCredentials = creds
			};

			var tokenHandler = new JwtSecurityTokenHandler();

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}

		public RefreshToken GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using var rng = RandomNumberGenerator.Create();
			rng.GetBytes(randomNumber);
			return new RefreshToken { Token = Convert.ToBase64String(randomNumber) };
		}
    }
}
