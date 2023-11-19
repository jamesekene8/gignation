using Application.Core;
using AutoMapper;
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
	public class Edit
	{
		public class Command : IRequest<Result<Unit>>
		{
			public Job Job { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _ctx;
			private readonly IMapper _mapper;

			public Handler(DataContext ctx, IMapper mapper)
            {
				_ctx = ctx;
				_mapper = mapper;
			}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FirstOrDefaultAsync(x => x.Id == request.Job.Id);
				if (job == null) return null;
				_mapper.Map(request.Job, job);
				var result = await _ctx.SaveChangesAsync() > 0;
				if (result) return Result<Unit>.Success(Unit.Value);
				return Result<Unit>.Failure("Unable to update job posting");
			}
		}
	}
}
