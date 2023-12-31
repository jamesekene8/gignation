﻿using API.Dto;
using API.Services;
using Application.Core;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly TokenService _tokenService;
		private readonly IConfiguration _config;
		private readonly IMapper _mapper;

		public AccountController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, TokenService tokenService, IConfiguration config, IMapper mapper)
        {
			_userManager = userManager;
			_roleManager = roleManager;
			_tokenService = tokenService;
			_config = config;
			_mapper = mapper;
		}

		[AllowAnonymous]
        [HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
		{
			if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
			{
				ModelState.AddModelError("email", "email has already been taken");
				return ValidationProblem();
			}

			var user = new AppUser
			{
				FirstName = registerDto.FirstName,
				Surname = registerDto.Surname,
				Email = registerDto.Email,
				UserName = registerDto.Email
			};

			var result = await _userManager.CreateAsync(user, registerDto.Password);

			if(result.Succeeded)
			{
				await _userManager.AddToRoleAsync(user, SD.Role_Freelancer);
				var roles = await _userManager.GetRolesAsync(user);
				await SetRefreshToken(user);
				return CreateUserObject(user, roles);

			}

			return BadRequest(result.Errors);
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email ==  loginDto.Email);
			if(user == null) return StatusCode(StatusCodes.Status401Unauthorized, new { message = "Invalid username or password" });
			var roles = await _userManager.GetRolesAsync(user);

			var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

			if(result)
			{
				await SetRefreshToken(user);
				return CreateUserObject(user, roles);
			}

			return StatusCode(StatusCodes.Status401Unauthorized, new { message = "Invalid username or password" }); ;

		}

		[HttpGet]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			var currentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
			var roles = await _userManager.GetRolesAsync(currentUser);
			await SetRefreshToken(currentUser);
			return CreateUserObject(currentUser, roles);
		}


		[HttpPost("refreshToken")]
		public async Task<ActionResult<UserDto>> RefreshToken()
		{
			var refreshToken = Request.Cookies["refreshToken"];
			var user = await _userManager.Users.Include(r => r.RefreshTokens).FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
			if(user == null) return Unauthorized();

			var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
			if (oldToken != null && !oldToken.IsActive)
			{
				return Unauthorized();
			}
			if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;

			var roles = await _userManager.GetRolesAsync(user);

			return CreateUserObject(user, roles);


		}


		private async Task SetRefreshToken(AppUser user)
		{
			var refreshToken = _tokenService.GenerateRefreshToken();
			user.RefreshTokens.Add(refreshToken);
			await _userManager.UpdateAsync(user);
			var cookieOptions = new CookieOptions
			{
				HttpOnly = true,
				Expires = DateTime.UtcNow.AddDays(7)
			};

			Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
		}
	


	private UserDto CreateUserObject(AppUser user, IList<string> roles)
			{
				return new UserDto
				{
					Email = user.Email,
					Token = _tokenService.CreateToken(user),
					Username = user.UserName,
					Role = roles[0]
				};
			}

		}
}
