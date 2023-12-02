using API.Services;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Security.Claims;
using System.Text;

namespace API.Extensions
{
	public static class IdentityServiceExtension
	{
		public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config) 
		{ 
			services.AddIdentity<AppUser, IdentityRole>(opt => opt.User.RequireUniqueEmail = true).AddEntityFrameworkStores<DataContext>();
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

			services.AddAuthentication(cfg =>
			{
				cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(opt =>
			{
				opt.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = key,
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero
				};

				opt.Events = new JwtBearerEvents
				{
					OnMessageReceived = context =>
					{
						var accessToken = context.Request.Query["access_token"];
						var path = context.HttpContext.Request.Path;
						if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
						{
							context.Token = accessToken;
						}
						return Task.CompletedTask;
					}
				};
			});

			services.AddAuthorization(options => {
				options.AddPolicy("IsAdmin", policy =>
				{
					policy.RequireRole(SD.Role_Admin);
				});
			});

			services.AddScoped<TokenService>();
			services.AddHttpContextAccessor();

			return services;
		}
	}
}
