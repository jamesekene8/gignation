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
	public class Delete
	{
		public class Command : IRequest<Result<Domain.Experience>> 
		{
			public int Id { get; set; }	
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
				var user = await _ctx.AppUsers.Include(e => e.Experiences).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var experience = user.Experiences.FirstOrDefault(x => x.Id == request.Id);

				if (experience == null) return null;

				_ctx.Experiences.Remove(experience);

				var success = await _ctx.SaveChangesAsync() > 0;

				if (success) return Result<Domain.Experience>.Success(experience);

				return Result<Domain.Experience>.Failure("Failed to remove experience");

			}


		}
	}
}
