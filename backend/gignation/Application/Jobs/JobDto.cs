using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Jobs
{
	public class JobDto
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.Now;
		public string Location { get; set; }
		public string JobType { get; set; }
		public string Salary { get; set; }
		public string JobPeriod { get; set; }
		public string CompanyName { get; set; }
		public string CompanySize { get; set; }
		public string CompanyType { get; set; }
		public Photo Image { get; set; }
		public bool Applied { get; set; }

		public bool IsActive { get; set; }
	}
}
