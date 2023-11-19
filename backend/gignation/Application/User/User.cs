using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
	public class User
	{
		public string Id { get; set; }
		public string FirstName { get; set; }
		public string Surname { get; set; }

		public string Username { get; set; }
		public string Title { get; set; }
		public string City { get; set; }
		public string Country { get; set; }
		public string Education { get; set; }
		public string Language { get; set; }
		public string Bio { get; set; }
		public string Photo { get; set; }
	}
}
