using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Command
{
	public class Edit
	{
		public class Command : IRequest<Result<Unit>>
		{
			public AppUser User { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;
			private readonly IMapper _mapper;
			private readonly IPhotoAccessor _photoAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor, IMapper mapper, IPhotoAccessor photoAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
				_mapper = mapper;
				_photoAccessor = photoAccessor;
			}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
				request.User.Id = user.Id;

				if(request.User.File != null)
				{
					var photoUploadResult = await _photoAccessor.AddPhoto(request.User.File);
					user.Image = new Photo
					{
						Id = photoUploadResult.PublicId,
						Url = photoUploadResult.Url,
					};
				}

				_mapper.Map(request.User, user);

				var result = await _ctx.SaveChangesAsync() > 0;

				if (result) return Result<Unit>.Success(Unit.Value);

				return Result<Unit>.Failure("Failed to update user info");
			}
		}
	}
}
