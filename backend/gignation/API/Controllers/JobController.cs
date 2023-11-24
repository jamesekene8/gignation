using Application.Core;
using Application.Jobs.Command;
using Application.Jobs.Query;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobController : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult> GetAllJobs([FromQuery]PagingParams param, string search = null)
		{
			return HandlePagedResult(await Mediator.Send(new List.Query { Search = search, Params = param }));
		}

		[HttpPost]
		[Authorize(Policy="IsAdmin")]
		public async Task<ActionResult> CreateJob(Job job)
		{
			return HandleResult(await Mediator.Send(new Create.Command { Job = job }));
		}

		[HttpPut("{id}")]
		[Authorize(Policy = "IsAdmin")]
		public async Task<ActionResult> EditJob(Guid id, Job job)
		{
			job.Id = id;
			return HandleResult(await Mediator.Send(new Edit.Command { Job = job }));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult> GetJob(Guid id)
		{
			return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
		}

		[HttpDelete("{id}")]
		[Authorize(Policy = "IsAdmin")]
		public async Task<ActionResult> DeleteJob(Guid id)
		{
			return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
		}

		[HttpPost("{id}/apply")]
		public async Task<ActionResult> ApplyForJob(Guid id, CoverLetter coverLetter)
		{
			return HandleResult(await Mediator.Send(new Apply.Command { Id = id, Body = coverLetter.Letter }));
		}

		[HttpPost("{id}/retrieve/application")]
		public async Task<ActionResult> CancelApplication(Guid id)
		{
			return HandleResult(await Mediator.Send(new RetrieveApplication.Command { Id = id}));
		}

		[HttpGet("{id}/applications")]
		[Authorize(Policy = "IsAdmin")]
		public async Task<ActionResult> ApplicantsList(Guid id)
		{
			return HandleResult(await Mediator.Send(new JobApplications.Query { Id = id }));
		}
	}
}
