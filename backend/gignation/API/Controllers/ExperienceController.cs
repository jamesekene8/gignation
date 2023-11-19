using Application.Experience.Command;
using Application.Experience.Query;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class ExperienceController : BaseApiController
	{
		[HttpPost]
		public async Task<ActionResult> AddExperience(Create.Command command)
		{
			return HandleResult(await Mediator.Send(command));
		}

		[HttpGet]
		public async Task<ActionResult> ListOfUserExperience()
		{
			return HandleResult(await Mediator.Send(new List.Query()));
		}
	}
}
