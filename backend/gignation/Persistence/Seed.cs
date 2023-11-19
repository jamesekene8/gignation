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
					UserName = "jamesekene8@gmail.com",
					Email = "jamesekene8@gmail.com",
					FirstName = "James",
					Surname = "Uguna",
					City = "Sunderland",
					Country = "United Kingdom",
					PhoneNumber = "07401326786",
				}, "Kinggeezyis9?");

				AppUser user = context.AppUsers.FirstOrDefault(u => u.Email == "jamesekene8@gmail.com");
				await userManager.AddToRoleAsync(user, "Admin");

				await context.SaveChangesAsync();
			}

			return;
		}
	}
}
