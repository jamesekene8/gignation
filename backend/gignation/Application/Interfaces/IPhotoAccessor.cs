using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
	public interface IPhotoAccessor
	{
		Task<PhotoUploadResult> AddPhoto(IFormFile file);

		Task<string> DeletePhoto(string publicId);

		Task<PhotoUploadResult> AddResume(IFormFile file);

		Task<string> DeleteResume(string publicId);
	}
}
