using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs.Command
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Job Job { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Job).SetValidator(new JobValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor, IMapper mapper)
            {
                _ctx = ctx;
				_userAccessor = userAccessor;
			}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _ctx.AppUsers.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
              
                user.Jobs.Add(request.Job);

                var result = await _ctx.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to Create Job posting");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
