using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using DescarTec.Api.Models.Dto;

namespace DescarTec.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        public async Task<ActionResult> SignUp([FromBody] SignUpDto signUpDto)
        {
            try
            {
                bool ret = await _authService.SignUp(signUpDto);

                return Ok(ret);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("sign-up-coletor")]
        public async Task<ActionResult> SignUpColetor([FromBody] SignUpColetorDto signUpDTO)
        {
            try
            {
                bool ret = await _authService.SignUpColetor(signUpDTO);

                return Ok(ret);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("sign-in")]
        public async Task<ActionResult> SignIn([FromBody] SignInDto signInDTO)
        {
            try
            {
                SsoDto ssoDTO = await _authService.SignIn(signInDTO);

                return Ok(ssoDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-user-to-admin-role")]
        public async Task<ActionResult> AddUserToAdminRole([FromBody] Guid userId)
        {
            try
            {
                await _authService.AddUserToAdminRole(userId);

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-current-user")]
        public async Task<ActionResult> GetCurrentUser()
        {
            try
            {
                var currentUser = await _authService.GetCurrentUser();

                return Ok(currentUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-users")]
        public async Task<ActionResult> ListUsers()
        {
            try
            {
                List<ApplicationUser> list = await _authService.ListUsers();

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-userdto")]
        public async Task<ActionResult> GetUserDTO([FromQuery] Guid id)
        {
            try
            {
                ApplicationUser user = await _authService.GetUserById(id);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}