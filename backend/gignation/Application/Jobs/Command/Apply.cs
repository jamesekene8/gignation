using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Jobs.Command
{
	public class Apply
	{
		public class Command : IRequest<Result<JobDto>>
		{
			public Guid Id { get; set; }
			public string Body { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<JobDto>>
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
            public async Task<Result<JobDto>> Handle(Command request, CancellationToken cancellationToken)
			{

				var user = await _ctx.AppUsers.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
				var job = await _ctx.Jobs.FirstOrDefaultAsync(x => x.Id == request.Id);
				if (job == null) return null;
				var jobApplication = await _ctx.JobApplicants.FindAsync(user.Id, job.Id);
				if (jobApplication == null)
				{
					var newApplication = new JobApplicant
					{
						AppUser = user,
						Job = job,
						CoverLetter = new CoverLetter
						{
							Applicant = user,
							Letter = request.Body
						}

					};
					await _ctx.JobApplicants.AddAsync(newApplication);
				} else
				{
					return Result<JobDto>.Failure("You have already applied for this job");
				}

				var jobAppliedTo = await _ctx.Jobs.ProjectTo<JobDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();

				var success = await _ctx.SaveChangesAsync() > 0;
				if (success) return Result<JobDto>.Success(jobAppliedTo);
				return Result<JobDto>.Failure("Failed to create a new job application");

			}
		}
	}
}
