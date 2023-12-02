using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
	public class AppUser : IdentityUser
	{
		public string FirstName { get; set; }
		public string Surname { get; set; }
		public string Title { get; set; }
		public string City { get; set; }
		public string Country { get; set; }

		public string Bio { get; set; }
		public int YearsOfExperience { get; set; }
		public string Website { get; set; }
		public string Linkdln { get; set; }
		public string Github { get; set; }	
		public string Twitter { get; set; }
		public Photo Image { get; set; }
		[NotMapped]
		public IFormFile File { get; set; }
		public string Skills { get; set; }
		public bool Remote { get; set; } = true;
		public string DesiredSalary { get; set; }
		public string DesiredRole { get; set; }
		public string DesiredLocation { get; set; }
		public Resume Resume { get; set; }
		public ICollection<Education> Educations { get; set; } = new List<Education>();
		public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
		public ICollection<Job> Jobs { get; set; } = new List<Job>();
		public ICollection<JobApplicant> JobApplicants { get; set; }
		public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
		

	}
}
