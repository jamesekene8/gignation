using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos.Command
{
	public class Add
	{
		public class Command : IRequest<Result<Unit>>
		{
			public IFormFile File { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _ctx;
			private readonly IPhotoAccessor _photoAccessor;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext ctx, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
				_ctx = ctx;
				_photoAccessor = photoAccessor;
				_userAccessor = userAccessor;
			}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

				user.Image = new Domain.Photo
				{
					Url = photoUploadResult.Url,
					Id = photoUploadResult.PublicId
				};

				var result = await _ctx.SaveChangesAsync() > 0;

				if (result) return Result<Unit>.Success(Unit.Value);

				return Result<Unit>.Failure("Failed to upload photo");

			
			}
		}

	}
}
