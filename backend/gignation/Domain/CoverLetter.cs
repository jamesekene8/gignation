using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class CoverLetter
	{
		public Guid Id { get; set; }
		public AppUser Applicant { get; set; }
		[Required]
		[MinLength(20)]
		public string Letter { get; set; }

	}
}
