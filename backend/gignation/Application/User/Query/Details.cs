using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Query
{
    public class Details
    {
        public class Query : IRequest<Result<User>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<User>>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;

            public Handler(DataContext ctx, IMapper mapper)
            {
                _ctx = ctx;
                _mapper = mapper;
            }
            public async Task<Result<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _ctx.AppUsers.ProjectTo<User>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.Id == request.Id);

                if (user == null) return null;

                return Result<User>.Success(user);
            }
        }
    }
}
