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

namespace Application.Jobs.Query
{
	public class Details
	{
		public class Query : IRequest<Result<Job>>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<Job>>
		{
			private readonly DataContext _ctx;

			public Handler(DataContext ctx)
            {
				_ctx = ctx;
			}
            public async Task<Result<Job>> Handle(Query request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FirstOrDefaultAsync(x => x.Id == request.Id);
				return Result<Job>.Success(job);
			}
		}
	}
}
