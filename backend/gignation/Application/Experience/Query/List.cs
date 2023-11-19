using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Experience.Query
{
	public class List
	{
		public class Query : IRequest<Result<List<Domain.Experience>>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<List<Domain.Experience>>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
			}

            public async Task<Result<List<Domain.Experience>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.Include(x => x.Experiences).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var exp = user.Experiences.ToList();

				return Result<List<Domain.Experience>>.Success(exp);
			}
		}
	}
}
