using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Resume.Query
{
	public class GetResume
	{
		public class Query : IRequest<Result<Domain.AppUser>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<Domain.AppUser>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
			}
            public async Task<Result<Domain.AppUser>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.Include(r => r.Resume).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());


				return Result<Domain.AppUser>.Success(user);
			}
		}
	}
}
