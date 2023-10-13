using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models;
using DescarTec.Api.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DescarTec.Api.Core.Impl.Service;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IColetorUserRepository _coletorUserRepository;

    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<UserBase> _userManager;

    public AuthService(
        IUserRepository userRepository,
        IColetorUserRepository coletorUserRepository, 
        IConfiguration configuration, 
        UserManager<UserBase> userManager,
        IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _coletorUserRepository = coletorUserRepository;

        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<List<ApplicationUser>> ListUsers()
    {
        List<ApplicationUser> listUsers = await _userRepository.ListUsers();

        return listUsers;
    }

    public async Task<ApplicationUser> GetUserById(Guid userId)
    {
        ApplicationUser user = await _userRepository.GetByIdAsync(userId);

        return user ?? throw new ArgumentException("Usuário não existe.");
    }
    public async Task<List<ApplicationUser>> GetListUserByCep(string cep)
    {
        var users = await _userRepository.GetListUserByCep(cep);

        return users ?? new List<ApplicationUser>();
    }

    public async Task<int> UpdateUser(ApplicationUser user)
    {
        ApplicationUser findUser = await _userRepository.GetByIdAsync(user.Id) ?? throw new ArgumentException("Usuário não encontrado.");

        findUser.Email = user.Email;
        findUser.UserName = user.UserName;

        return await _userRepository.UpdateAsync(findUser);
    }

    public async Task<bool> DeleteUser(Guid userId)
    {
        ApplicationUser findUser = await _userRepository.GetByIdAsync(userId) ?? throw new ArgumentException("Usuário não encontrado.");
        await _userRepository.DeleteAsync(findUser);

        return true;
    }

    private static Endereco CreateEndereco(SignUpDto signUpDto)
    {
        Endereco endereco = new()
        {
            Cep = signUpDto.Cep,
            Bairro = signUpDto.Bairro,
            Ddd = signUpDto.Ddd,
            Ibge = signUpDto.Ibge,
            Localidade = signUpDto.Localidade,
            Logradouro = signUpDto.Logradouro,
            Uf = signUpDto.Uf,
        };

        return endereco;
    }

    public async Task<bool> SignUp(SignUpDto signUpDto)
    {
        ApplicationUser? userExists = (ApplicationUser)await _userManager.FindByNameAsync(signUpDto.Username);
        if (userExists != null)
            throw new ArgumentException("Username já existe");

        userExists = (ApplicationUser)await _userManager.FindByEmailAsync(signUpDto.Email);
        if (userExists != null)
            throw new ArgumentException("Email já existe");

        ApplicationUser user = new()
        {
            Email = signUpDto.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = signUpDto.Username,
            DataNascimento = signUpDto.DataNascimento,
            Nome = signUpDto.NomeCompleto,
            PhoneNumber = signUpDto.PhoneNumber,
            Endereco = CreateEndereco(signUpDto)
        };

        var result = await _userManager.CreateAsync(user, signUpDto.Password);

        if (!result.Succeeded)
            if (result.Errors.ToList().Count > 0)
                throw new ArgumentException(result.Errors.ToList()[0].Description);
            else
                throw new ArgumentException("Cadastro do usuário falhou.");

        // If this is the first user, add admin role
        var isFirstUser = await _userManager.Users.CountAsync() == 1;
        if (isFirstUser)
        {
            var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
            if (!roleResult.Succeeded)
            {
                throw new ArgumentException("Falha ao adicionar o usuário ao papel de administrador.");
            }
        }

        return true;
    }

    public async Task<bool> SignUpColetor(SignUpColetorDto signUpColetorDto)
    {
        UserBase? userExists = await _userManager.FindByNameAsync(signUpColetorDto.Username);
        if (userExists != null)
            throw new ArgumentException("Username já existe");

        userExists = await _userManager.FindByEmailAsync(signUpColetorDto.Email);
        if (userExists != null)
            throw new ArgumentException("Email já existe");

        ColetorUser user = new()
        {
            Email = signUpColetorDto.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = signUpColetorDto.Username,
            Nome = signUpColetorDto.NomeCompleto,
            PhoneNumber = signUpColetorDto.PhoneNumber            
        };

        var result = await _userManager.CreateAsync(user, signUpColetorDto.Password);

        if (!result.Succeeded)
            if (result.Errors.ToList().Count > 0)
                throw new ArgumentException(result.Errors.ToList()[0].Description);
            else
                throw new ArgumentException("Cadastro do usuário falhou.");

        var roleResult = await _userManager.AddToRoleAsync(user, "Coletor");
        if (!roleResult.Succeeded)
        {
            _ = _userManager.DeleteAsync(user);
            throw new ArgumentException("Falha ao adicionar o usuário ao papel de coletor.");
        }

        return true;
    }

    private async Task AddUserToRoleAsync(Guid userId, string roleName)
    {
        ApplicationUser user = (ApplicationUser)await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            throw new ArgumentException("User not found.");

        await _userManager.AddToRoleAsync(user, roleName);
    }

    [Authorize(Roles = "Admin")]
    public async Task AddUserToAdminRole(Guid userId)
    {
        await AddUserToRoleAsync(userId, "Admin");
    }

    public async Task<SsoDto> SignIn(SignInDto signInDto)
    {
        var user = await _userManager.FindByNameAsync(signInDto.Username);
        if (user == null)
            throw new ArgumentException("Usuário não encontrado.");

        if (!await _userManager.CheckPasswordAsync(user, signInDto.Password))
            throw new ArgumentException("Senha inválida.");

        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.UtcNow.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new SsoDto(new JwtSecurityTokenHandler().WriteToken(token), user);
    }

    public async Task<UserBase> GetCurrentUser()
    {
        UserBase? user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext!.User);

        return user;
    }
}