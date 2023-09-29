using DescarTec.Api.Models;
using DescarTec.Api.Models.Dto;
using DescarTec.Api.Models.Request;

namespace DescarTec.Api.Core.Interfaces.Service
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> ListUsers();
        Task<ApplicationUser> GetUserById(Guid userId);
        Task<int> UpdateUser(ApplicationUser user);
        Task<bool> DeleteUser(Guid userId);
        Task<bool> SignUp(SignUpDto signUpDto);
        Task<bool> SignUpColetor(SignUpColetorDto signUpColetorDto);
        Task<SsoDto> SignIn(SignInDto signInDto);
        Task AddUserToAdminRole(Guid userId);
        Task<UserBase> GetCurrentUser();
        Task<List<ApplicationUser>> GetListUserByCep(string cep);
    }
}
