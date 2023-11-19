using Application.Core;
using Application.Interfaces;
using Application.Jobs;
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

namespace Application.User.Query
{
	public class JobApplications
	{
		public class Query : IRequest<Result<List<JobApplicationDto>>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<List<JobApplicationDto>>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;
			private readonly IMapper _mapper;

			public Handler(DataContext ctx, IUserAccessor userAccessor, IMapper mapper)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
				_mapper = mapper;
			}
            public async Task<Result<List<JobApplicationDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var jobApplications = await _ctx.JobApplicants.Where(x => x.AppUser.UserName == _userAccessor.GetUsername())
					.Select(x  => new JobApplicationDto
					{
						Job = x.Job,
						CoverLetter = x.CoverLetter.Letter

					})
					.ToListAsync();
				return Result<List<JobApplicationDto>>.Success(jobApplications);
			}
		}

	}
}
