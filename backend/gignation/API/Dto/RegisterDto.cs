using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
	public class RegisterDto
	{
		public string FirstName { get; set; }
		public string Surname { get; set; }
		[Required]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
		/*Pa$$w0rd*/
		public string Password { get; set; }
		[Required]
		[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		public string ConfirmPassword { get; set; }
		public string Title { get; set; }
		public string City { get; set; }
		public string Country { get; set; }
		public string ZipCode { get; set; }
		public string HourlyRate { get; set; }
		public string Education { get; set; }
	}
}
