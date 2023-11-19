using Application.Jobs;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User
{
	public class JobApplicationDto
	{
		public Job Job { get; set; }
		public string CoverLetter { get; set; }

		
	}
}
