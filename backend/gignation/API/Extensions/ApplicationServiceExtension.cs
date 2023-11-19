using API.Services;
using Application.Core;
using Application.Interfaces;
using Application.Jobs.Command;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Extensions
{
	public static class ApplicationServiceExtension
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
		{
			services.AddCors(opt =>
			{
				opt.AddPolicy("CorsPolicy", policy =>
				{
					policy.AllowAnyHeader().AllowAnyMethod()
					.AllowCredentials()
					.WithExposedHeaders("WWW-Authenticate", "Pagination")
					.WithOrigins("http://localhost:3000");
				});
			});

			services.AddDbContext<DataContext>(options => options.UseSqlServer(config.GetConnectionString("DefaultConnection")));
			services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Create.Handler).Assembly));
			services.AddFluentValidationAutoValidation();
			services.AddValidatorsFromAssemblyContaining<Create>();
			services.AddScoped<IUserAccessor, UserAccessor>();
			services.AddScoped<IPhotoAccessor, PhotoAccessor>();
			services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
			services.AddAutoMapper(typeof(MappingProfiles).Assembly);
			services.AddSignalR();
			


			return services;
		}
	}
}
