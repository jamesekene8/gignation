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

namespace Application.Experience.Command
{
	public class Create
	{
		public class Command : IRequest<Result<Domain.Experience>>
		{
			public string JobRole { get; set; }
			public string CompanyName { get; set; }
			public string Description { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Domain.Experience>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
			}
            public async Task<Result<Domain.Experience>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = _ctx.AppUsers.Include(e => e.Experiences).FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

				var exp = new Domain.Experience
				{
					JobRole = request.JobRole,
					CompanyName = request.CompanyName,
					Description = request.Description,
				};

				user.Experiences.Add(exp);

				var success = await _ctx.SaveChangesAsync() > 0;

				if (success) return Result<Domain.Experience>.Success(exp);
				return Result<Domain.Experience>.Failure("Failed to add experience");
			}
		}
	}
}
