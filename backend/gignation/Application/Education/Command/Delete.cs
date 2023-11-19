using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Education.Command
{
	public class Delete
	{
		public class Command : IRequest<Result<Domain.Education>>
		{
			public int Id { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Domain.Education>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor)
			{
				_ctx = ctx;
				_userAccessor = userAccessor;
			}
			public async Task<Result<Domain.Education>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.Include(x => x.Educations).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var edu = user.Educations.FirstOrDefault(x => x.Id == request.Id);

				if (edu == null) return null;

				_ctx.Educations.Remove(edu);

				var success = await _ctx.SaveChangesAsync() > 0;

				if (success) return Result<Domain.Education>.Success(edu);

				return Result<Domain.Education>.Failure("Failed to delete education");
			}

		}
	}
}
