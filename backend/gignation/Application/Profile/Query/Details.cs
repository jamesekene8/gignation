using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profile.Query
{
	public class Details
	{
		public class Query : IRequest<Result<ProfileDto>>
		{

		}

		public class Handler : IRequestHandler<Query, Result<ProfileDto>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;
			private readonly IMapper _mapper;

			public Handler(DataContext ctx, IUserAccessor userAccessor, IMapper mapper)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
				_mapper = mapper;
			}
            public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers
					.Include(p => p.Educations)
					.Include(x => x.Experiences)
					.Include(I => I.Image)
					.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var userProfile = _mapper.Map<ProfileDto>(user);

				return Result<ProfileDto>.Success(userProfile);
			}
		}
	}
}
