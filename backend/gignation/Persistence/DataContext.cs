using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Persistence
{
	public class DataContext : IdentityDbContext<AppUser>
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{

		}

		public DbSet<Job> Jobs { get; set; }
		public DbSet<AppUser> AppUsers { get; set; }

		public DbSet<Photo> Photos { get; set; }
		public DbSet<JobApplicant> JobApplicants { get; set; }

		public DbSet<CoverLetter> CoverLetters { get; set; }

		public DbSet<Experience> Experiences { get; set; }

		public DbSet<Education> Educations { get; set; }

		public DbSet<Comment> Comments { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<Job>()
				.HasOne(u => u.JobPoster)
				.WithMany(u => u.Jobs)
				.OnDelete(DeleteBehavior.Cascade);

			builder.Entity<Comment>()
				.HasOne(a => a.Job)
				.WithMany(a => a.Comments)
				.OnDelete(DeleteBehavior.Cascade);

			builder.Entity<JobApplicant>(b =>
			{
				b.HasKey(k => new { k.AppUserId, k.JobId });

				b.HasOne(o => o.AppUser)
				.WithMany(f => f.JobApplicants)
				.HasForeignKey(o => o.AppUserId)
				.OnDelete(DeleteBehavior.ClientSetNull);

				b.HasOne(o => o.Job)
				.WithMany(f => f.JobApplicants)
				.HasForeignKey(o => o.JobId)
				.OnDelete(DeleteBehavior.ClientSetNull);
			});

		}
	}
}
