using Application.Photos.Command;
using Application.Profiles.Command;
using Application.Profiles.Query;
using Application.Resume.Command;
using Application.Resume.Query;
using Application.User.Query;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
	{
		[HttpGet("{id}")]
		public async Task<ActionResult> GetProfile(string id)
		{
			return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
		}

		[HttpPut("edit")]
		public async Task<ActionResult> EditProfile([FromForm] AppUser user)
		{
			return HandleResult(await Mediator.Send(new Edit.Command { User = user }));
		}

		[HttpGet("applications")]
		public async Task<ActionResult> GetCurrentUserJobApplications()
		{
			return HandleResult(await Mediator.Send(new JobApplications.Query()));
		}

		[HttpPut("edit/uploadPhoto")]
		public async Task<ActionResult> UploadUserProfilePhoto([FromForm] Add.Command command)
		{
			return HandleResult(await Mediator.Send(command));
		}

		[HttpGet("resume")]
		public async Task<ActionResult> GetResume()
		{
			return HandleResult(await Mediator.Send(new GetResume.Query()));
		}

		[HttpPost("resume/upload")]
		public async Task<ActionResult> UploadResume([FromForm] AddResume.Command command)
		{
			return HandleResult(await Mediator.Send(command));
		}
	}
}
