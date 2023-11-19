using Application.Profile.Query;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class ProfileController : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult> GetUserProfile()
		{
			return HandleResult(await Mediator.Send(new Details.Query()));
		}
	}
}
