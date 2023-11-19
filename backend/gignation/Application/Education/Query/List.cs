using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Education.Query
{
	public class List
	{
		public class Query : IRequest<Result<List<Domain.Education>>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<List<Domain.Education>>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
			{
				_ctx = ctx;
				_userAccessor = userAccessor;
			}

			public async Task<Result<List<Domain.Education>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.Include(x => x.Educations).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var edu = user.Educations.ToList();

				return Result<List<Domain.Education>>.Success(edu);
			}
		}
	}
}
