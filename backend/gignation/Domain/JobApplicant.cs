using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class JobApplicant
	{
		public Guid JobId { get; set; }
		public Job Job { get; set; }
		public string AppUserId { get; set; }
		public AppUser AppUser { get; set; }
		public CoverLetter CoverLetter { get; set; }
		public string Status { get; set; } = "Pending";
	}
}
