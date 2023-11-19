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

namespace Application.Education.Command
{
	public class Create
	{
		public class Command : IRequest<Result<Domain.Education>>
		{
			public string Name { get; set; }
			public string Degree { get; set; }
			public double GPA { get; set; }
			public DateTime GradYear { get; set; }
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
				var user = _ctx.AppUsers.Include(e => e.Educations).FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

				var edu = new Domain.Education
				{
					Name = request.Name,
					Degree = request.Degree,
					GPA = request.GPA,
					GradYear = request.GradYear,
				};

				user.Educations.Add(edu);


				var success = await _ctx.SaveChangesAsync() > 0;

				if (success) return Result<Domain.Education>.Success(edu);
				return Result<Domain.Education>.Failure("Failed to add education");
			}
		}
	}
}
