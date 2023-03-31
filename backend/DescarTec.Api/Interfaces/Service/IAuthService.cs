using DescarTec.Api.Domain.Models.DTOs;
using DescarTec.Api.Models;
using DescarTec.Api.Models.Dto;

namespace DescarTec.Api.Interfaces.Service
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> ListUsers();
        Task<ApplicationUser> GetUserById(Guid userId);
        Task<int> UpdateUser(ApplicationUser user);
        Task<bool> DeleteUser(Guid userId);
        Task<bool> SignUp(SignUpDto signUpDto);
        Task<SsoDto> SignIn(SignInDto signInDto);
        Task<ApplicationUser> GetCurrentUser();
    }
}
