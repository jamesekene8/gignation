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
		public class Query : IRequest<Result<PagedList<JobDto>>>
		{
			public string Search {get; set;}

			public PagingParams Params { get; set;}
		}

		public class Handler : IRequestHandler<Query, Result<PagedList<JobDto>>>
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
            public async Task<Result<PagedList<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = _ctx.AppUsers.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

				IQueryable<JobDto> query = null;

				if(request.Search != null)
				{
					if(request.Search == "")
					{
						query = _ctx.Jobs
							.OrderBy(d => d.CreatedAt)
							.ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsQueryable();
					}
					query = _ctx.Jobs
						.Where(e => e.Title.Contains(request.Search))
						.OrderBy(d => d.CreatedAt)
						.ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsQueryable();
				} else
				{
					query = _ctx.Jobs
						.OrderBy(d => d.CreatedAt)
						.ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsQueryable();
				}


				var pagedList = await PagedList<JobDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

					foreach (var job in pagedList){
						var applied = await _ctx.JobApplicants.FindAsync(user.Id, job.Id);
						if (applied == null)
						{
							job.Applied = false;
						}
						else
						{
							job.Applied = true;
						}
					};

				return Result<PagedList<JobDto>>.Success(pagedList);
			}
		}
	}
}
