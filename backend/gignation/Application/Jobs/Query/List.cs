using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs.Query
{
	public class List
	{
		public class Query : IRequest<Result<List<JobDto>>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<List<JobDto>>>
		{
			private readonly DataContext _ctx;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IMapper mapper, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}
            public async Task<Result<List<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = _ctx.AppUsers.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());
				
				var jobs = await _ctx.Jobs.ProjectTo<JobDto>(_mapper.ConfigurationProvider).ToListAsync();

				foreach (var job in jobs)
				{
					var applied = await _ctx.JobApplicants.FindAsync(user.Id, job.Id);
					if(applied == null)
					{
						job.Applied = false;
					} else
					{
						job.Applied = true;
					}
				}
				
				return Result<List<JobDto>>.Success(jobs);
			}
		}
	}
}
