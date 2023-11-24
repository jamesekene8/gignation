using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comment.Command
{
	public class Create
	{
		public class Command : IRequest<Result<CommentDto>>
		{
			public string Body { get; set; }

			public Guid JobId { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
            public CommandValidator()
            {
				RuleFor(x => x.Body).NotEmpty();
            }
        }

		public class Handler : IRequestHandler<Command, Result<CommentDto>>
		{
			private readonly IUserAccessor _userAccessor;
			private readonly DataContext _ctx;
			private readonly IMapper _mapper;

			public Handler(IUserAccessor userAccessor, DataContext ctx, IMapper mapper)
            {
				_userAccessor = userAccessor;
				_ctx = ctx;
				_mapper = mapper;
			}
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
			{
				var job = await _ctx.Jobs.FindAsync(request.JobId);

				if (job == null) return null;

				var user = await _ctx.AppUsers.Include(p => p.Image).SingleOrDefaultAsync( x => x.UserName == _userAccessor.GetUsername());

				var comment = new Domain.Comment
				{
					Author = user,
					Job = job,
					Body = request.Body

				};

				job.Comments.Add(comment);

				var newComment = _mapper.Map<CommentDto>(comment);

				var result = await _ctx.SaveChangesAsync() > 0;

				if (result) return Result<CommentDto>.Success(newComment);

				return Result<CommentDto>.Failure("Failed to add comment");




			}
		}
	}
}
