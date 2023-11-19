using Application.Education.Command;
using Application.Education.Query;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class EducationController : BaseApiController
	{
		[HttpPost]
		public async Task<ActionResult> CreateEducation(Create.Command command)
		{
			return HandleResult(await Mediator.Send(command));
		}

		[HttpGet]
		public async Task<ActionResult> ListEducation()
		{
			return HandleResult(await Mediator.Send(new List.Query()));
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> RemoveEducation(int id)
		{
			return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
		}
	}
}
