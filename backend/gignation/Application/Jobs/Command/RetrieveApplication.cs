using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Jobs.Command
{
	public class RetrieveApplication
	{
		public class Command : IRequest<Result<Job>>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Job>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
			}
            public async Task<Result<Job>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var job = await _ctx.Jobs.FirstOrDefaultAsync(x => x.Id == request.Id);
				if (job == null) return null;

				var jobApp = await _ctx.JobApplicants.FindAsync(user.Id, request.Id);

				if (jobApp == null) return null;

				_ctx.JobApplicants.Remove(jobApp);

				var result = await _ctx.SaveChangesAsync() > 0;
				if (!result) return Result<Job>.Failure("Failed to remove job application");
				return Result<Job>.Success(job);

			}
		}
	}
}
