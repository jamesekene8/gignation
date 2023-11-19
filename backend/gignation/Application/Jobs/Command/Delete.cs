 using Application.Core;
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
	public class Delete
	{
		public class Command : IRequest<Result<Job>>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Job>>
		{
			private readonly DataContext _ctx;

			public Handler(DataContext ctx)
            {
				_ctx = ctx;
			}
            public async Task<Result<Job>> Handle(Command request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FindAsync(request.Id);

				if (job == null) return null;
				
				_ctx.Jobs.Remove(job);

				var result = await _ctx.SaveChangesAsync() > 0;
				if (!result) return Result<Job>.Failure("Unable to delete job");
				return Result<Job>.Success(job);

			}
		}
	}
}
