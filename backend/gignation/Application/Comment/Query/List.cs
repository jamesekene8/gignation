using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comment.Query
{
	public class List
	{
		public class Query : IRequest<Result<List<CommentDto>>>
		{
			public Guid JobId { get; set; }
		}

		public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
		{
			private readonly DataContext _ctx;
			private readonly IMapper _mapper;

			public Handler(DataContext ctx, IMapper mapper)
            {
				_ctx = ctx;
				_mapper = mapper;
			}
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FindAsync(request.JobId);
				if (job == null) return null;

				var comments = await _ctx.Comments.Where(x => x.Job.Id == request.JobId)
					.OrderByDescending(x => x.CreatedAt)
					.ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
					.ToListAsync();

				return Result<List<CommentDto>>.Success(comments);
			}
		}
	}
}
