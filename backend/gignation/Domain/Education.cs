using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class Education
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Degree { get; set; }
		public double GPA { get; set; }
		public DateTime GradYear { get; set; }
	}
}
