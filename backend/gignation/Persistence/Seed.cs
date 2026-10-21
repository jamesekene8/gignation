using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
	public class Seed
	{
		public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
		{
			if (!roleManager.RoleExistsAsync("Admin").GetAwaiter().GetResult())
			{
				await roleManager.CreateAsync(new IdentityRole("Admin"));
				await roleManager.CreateAsync(new IdentityRole("Freelancer"));
				await roleManager.CreateAsync(new IdentityRole("Company"));

				await userManager.CreateAsync(new AppUser
				{
					UserName = "admin@gignation.dev",
					Email = "admin@gignation.dev",
					FirstName = "Demo",
					Surname = "Admin",
					City = "Sunderland",
					Country = "United Kingdom",
					PhoneNumber = "",
				}, "Pa$$w0rd");

				AppUser user = context.AppUsers.FirstOrDefault(u => u.Email == "admin@gignation.dev");
				await userManager.AddToRoleAsync(user, "Admin");

				await context.SaveChangesAsync();
			}

			return;
		}
	}
}
