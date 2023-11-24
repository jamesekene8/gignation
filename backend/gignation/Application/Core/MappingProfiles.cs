using Application.Comment;
using Application.Jobs;
using Application.Profile;
using AutoMapper;
using Domain;

namespace Application.Core
{
	public class MappingProfiles : AutoMapper.Profile
	{
		public MappingProfiles()
		{
			CreateMap<AppUser, AppUser>()
				.ForAllMembers(opt => opt.Condition((src, dest, srcMember, destMember) => srcMember != null));
			CreateMap<AppUser, ApplicantsDto>();
			CreateMap<AppUser, Profiles.User>();
			CreateMap<Job, Job>().ForAllMembers(opt => opt.Condition((src, dest, srcMember, destMember) => srcMember != null));
			CreateMap<Job, JobDto>();
			CreateMap<Domain.Comment, CommentDto>()
				.ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.FirstName))
				.ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
				.ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Image.Url));
			CreateMap<CoverLetter, ApplicantsDto>()
				.ForMember(d => d.CoverLetter, o => o.MapFrom(s => s.Letter))
				.ForMember(d => d.FirstName, o => o.MapFrom(s => s.Applicant.FirstName))
				.ForMember(d => d.Surname, o => o.MapFrom(s => s.Applicant.Surname))
				.ForMember(d => d.Title, o => o.MapFrom(s => s.Applicant.Title))
				.ForMember(d => d.Photo, o => o.MapFrom(s => s.Applicant.Image.Url))
				.ForMember(d => d.Role, o => o.MapFrom(s => s.Applicant.DesiredRole))
				.ForMember(d => d.Country, o => o.MapFrom(s => s.Applicant.Country))
				.ForMember(d => d.Bio, o => o.MapFrom(s => s.Applicant.Bio))
				.ForMember(d => d.YearsOfExperience, o => o.MapFrom(s => s.Applicant.YearsOfExperience))
				.ForMember(d => d.DesiredSalary, o => o.MapFrom(s => s.Applicant.DesiredSalary))
				.ForMember(d => d.Email, o => o.MapFrom(s => s.Applicant.Email));
			CreateMap<AppUser, ProfileDto>()
				.ForMember(d => d.profilePhoto, o => o.MapFrom(s => s.Image.Url));

		}
	}
}
