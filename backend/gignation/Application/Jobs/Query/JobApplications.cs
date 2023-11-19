using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
	public class JobApplications
	{
		public class Query : IRequest<Result<List<ApplicantsDto>>>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<List<ApplicantsDto>>>
		{
			private readonly DataContext _ctx;
			private readonly IMapper _mapper;

			public Handler(DataContext ctx, IMapper mapper)
            {
				_ctx = ctx;
				_mapper = mapper;
			}
            public async Task<Result<List<ApplicantsDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FirstOrDefaultAsync(x => x.Id == request.Id);
				if (job == null) return null;

				var applicants = await _ctx.JobApplicants.Where(x => x.JobId == job.Id)
					.Select(p => p.CoverLetter)
					.ProjectTo<ApplicantsDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				return Result<List<ApplicantsDto>>.Success(applicants);
			}
		}
	}
}
