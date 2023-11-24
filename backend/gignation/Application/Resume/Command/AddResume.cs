using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Resume.Command
{
	public class AddResume
	{
		public class Command : IRequest<Result<Unit>>
		{
			public IFormFile File { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _ctx;
			private readonly IUserAccessor _userAccessor;
			private readonly IPhotoAccessor _photoAccessor;

			public Handler(DataContext ctx, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
				_ctx = ctx;
				_userAccessor = userAccessor;
				_photoAccessor = photoAccessor;
			}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _ctx.AppUsers.Include(r => r.Resume).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				if(user.Resume != null)
				{
					var oldResume = await _photoAccessor.DeleteResume(user.Resume.Id);
				}

				var resumeUploadResult = await _photoAccessor.AddResume(request.File);

				user.Resume = new Domain.Resume
				{
					Id = resumeUploadResult.PublicId,
					Url = resumeUploadResult.Url,
				};

				var result = await _ctx.SaveChangesAsync() > 0;
				if (result) return Result<Unit>.Success(Unit.Value);
				return Result<Unit>.Failure("Resume not uploaded");
			}

		}


	}
}
