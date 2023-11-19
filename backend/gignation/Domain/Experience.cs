using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class Experience
	{
		public int Id { get; set; }
		[Required]
		public string JobRole { get; set; }
		[Required]
		public string CompanyName { get; set; }
		public DateTime From { get; set; }
		public DateTime To { get; set; }
		[Required]
		public string Description { get; set; }

	}
}
