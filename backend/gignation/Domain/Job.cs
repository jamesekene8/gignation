using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class Job
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
		public string Location { get; set; }
		public string JobType { get; set; }
		public string Salary { get; set; }
		public string JobPeriod { get; set; }
		public string CompanyName { get; set; }
		public string CompanySize { get; set; }
		public string CompanyType { get; set; }
		public bool IsActive { get; set; } = true;
		public Photo Image { get; set; }
		public AppUser JobPoster { get; set; }
		public ICollection<JobApplicant> JobApplicants { get; set; }
		public ICollection<Comment> Comments { get; set; } = new List<Comment>();
	}
}
